import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

interface CacheEntry {
  value: string;
  expiresAt: number;
}

@Injectable()
export class RedisCacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisCacheService.name);
  private redisClient: Redis | null = null;
  private isRedisConnected = false;
  private readonly memoryStore = new Map<string, CacheEntry>();
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const redisUrl =
      this.config.get<string>('REDIS_URL') ||
      process.env.REDIS_URL;
    

    try {
      this.redisClient = new Redis(redisUrl, {
        lazyConnect: true,
        connectTimeout: 2000,
        maxRetriesPerRequest: 1,
        retryStrategy: (times) => {
          if (times > 2) return null;
          return 500;
        },
      });

      this.redisClient.on('connect', () => {
        this.isRedisConnected = true;
        this.logger.log(`Connected to Redis cache at ${redisUrl}`);
      });

      this.redisClient.on('error', (err) => {
        if (this.isRedisConnected) {
          this.logger.warn(`Redis connection issue: ${err.message}`);
        }
        this.isRedisConnected = false;
      });

      await this.redisClient.connect();
    } catch {
      this.isRedisConnected = false;
      this.logger.log('Redis server not reachable, operating with fast in-memory cache.');
    }

    this.cleanupTimer = setInterval(() => this.purgeExpiredMemory(), 60000);
  }

  onModuleDestroy() {
    if (this.cleanupTimer) clearInterval(this.cleanupTimer);
    if (this.redisClient) {
      this.redisClient.disconnect();
    }
  }

  private purgeExpiredMemory() {
    const now = Date.now();
    for (const [key, entry] of this.memoryStore.entries()) {
      if (entry.expiresAt <= now) {
        this.memoryStore.delete(key);
      }
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    let raw: string | null = null;

    if (this.isRedisConnected && this.redisClient) {
      try {
        raw = await this.redisClient.get(key);
      } catch {
        this.isRedisConnected = false;
      }
    }

    if (!raw) {
      const entry = this.memoryStore.get(key);
      if (entry) {
        if (entry.expiresAt <= Date.now()) {
          this.memoryStore.delete(key);
        } else {
          raw = entry.value;
        }
      }
    }

    if (raw === null || raw === undefined) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  }

  async set<T = any>(key: string, value: T, ttlSeconds = 7200): Promise<void> {
    const raw = typeof value === 'string' ? value : JSON.stringify(value);

    if (this.isRedisConnected && this.redisClient) {
      try {
        await this.redisClient.set(key, raw, 'EX', ttlSeconds);
        return;
      } catch {
        this.isRedisConnected = false;
      }
    }

    this.memoryStore.set(key, {
      value: raw,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  async del(key: string): Promise<void> {
    if (this.isRedisConnected && this.redisClient) {
      try {
        await this.redisClient.del(key);
      } catch {
        this.isRedisConnected = false;
      }
    }
    this.memoryStore.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    if (this.isRedisConnected && this.redisClient) {
      try {
        const count = await this.redisClient.exists(key);
        return count > 0;
      } catch {
        this.isRedisConnected = false;
      }
    }

    const entry = this.memoryStore.get(key);
    if (!entry) return false;
    if (entry.expiresAt <= Date.now()) {
      this.memoryStore.delete(key);
      return false;
    }
    return true;
  }

  async expire(key: string, ttlSeconds: number): Promise<void> {
    if (this.isRedisConnected && this.redisClient) {
      try {
        await this.redisClient.expire(key, ttlSeconds);
        return;
      } catch {
        this.isRedisConnected = false;
      }
    }

    const entry = this.memoryStore.get(key);
    if (entry) {
      entry.expiresAt = Date.now() + ttlSeconds * 1000;
    }
  }
}

