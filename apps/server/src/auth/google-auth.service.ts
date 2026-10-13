import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

export interface GoogleUserPayload {
  google_ID: string;
  email: string;
  email_verified?: boolean;
  name?: string;
}

@Injectable()
export class GoogleAuthService {
  private readonly logger = new Logger(GoogleAuthService.name);
  private client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    this.client = new OAuth2Client(clientId);
  }

  async verifyGoogleToken(token: string): Promise<GoogleUserPayload | null> {
    try {
      const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: clientId,
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.sub || !payload.email) {
        return null;
      }
      return {
        google_ID: payload.sub,
        email: payload.email.toLowerCase(),
        email_verified: payload.email_verified,
        name: payload.name,
      };
    } catch (err) {
      this.logger.error('Failed to verify Google token', err);
      return null;
    }
  }
}
