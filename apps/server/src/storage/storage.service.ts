import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { TestCaseItem } from '../database/schema/problems.schema';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3Client: S3Client | null = null;
  private readonly bucket: string;
  private readonly isConfigured: boolean = false;

  constructor(private readonly configService: ConfigService) {
    const accountId = this.configService.get<string>('R2_ACCOUNT_ID');
    const accessKeyId = this.configService.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('R2_SECRET_ACCESS_KEY');
    this.bucket = this.configService.get<string>('R2_BUCKET_NAME');

    const customEndpoint = this.configService.get<string>('R2_ENDPOINT');
    const endpoint = customEndpoint || (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined);

    if (accessKeyId && secretAccessKey && endpoint) {
      try {
        this.s3Client = new S3Client({
          region: 'auto',
          endpoint,
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
        });
        this.isConfigured = true;
        this.logger.log(`Cloudflare R2 storage initialized for bucket "${this.bucket}"`);
      } catch (err: any) {
        this.logger.error(`Failed to initialize Cloudflare R2 client: ${err?.message}`, err);
      }
    } else {
      this.logger.warn(
        'Cloudflare R2 credentials (R2_ACCOUNT_ID/R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY) not found in env. Ensure credentials are set to fetch test cases.',
      );
    }
  }

  isR2Configured(): boolean {
    return this.isConfigured;
  }

  async getTestCases(key: string): Promise<TestCaseItem[]> {
    if (!this.s3Client || !this.isConfigured) {
      throw new InternalServerErrorException(
        'Cloudflare R2 is not configured. Please supply R2 credentials in environment variables.',
      );
    }

    try {
      const response = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );

      if (!response.Body) {
        throw new NotFoundException(`No test cases body found for key "${key}"`);
      }

      const bodyString = await response.Body.transformToString();
      return JSON.parse(bodyString) as TestCaseItem[];
    } catch (err: any) {
      if (err.name === 'NoSuchKey' || err?.$metadata?.httpStatusCode === 404) {
        throw new NotFoundException(`Test cases with key "${key}" not found in Cloudflare R2`);
      }
      this.logger.error(`Failed to retrieve test cases from Cloudflare R2: ${err?.message}`, err);
      throw new InternalServerErrorException(`Error fetching test cases from R2: ${err?.message}`);
    }
  }
}
