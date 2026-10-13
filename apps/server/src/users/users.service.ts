import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, NewUser } from '../database/schema';
import { GoogleAuthService } from '../auth/google-auth.service';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GoogleOAuthDto } from './dto/google-oauth.dto';
import { SafeUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  private sanitizeUser(user: User): SafeUser {
    const { hpassword, ...safe } = user;
    return safe;
  }

  private signToken(user: User): string {
    const secret = this.configService.get<string>('JWT_SECRET') || 'default_secret';
    return jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      secret,
      { expiresIn: '1d' },
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findByGoogleId(googleId);
  }

  async register(dto: RegisterUserDto) {
    const existingUser = await this.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('User already exists!');
    }

    const salt = 10;
    const hpassword = await bcrypt.hash(dto.password, salt);

    const created = await this.usersRepository.create({
      username: dto.username.trim(),
      email: dto.email.trim().toLowerCase(),
      hpassword,
    });

    return {
      message: 'User registered successfully!',
      user: this.sanitizeUser(created),
    };
  }

  async login(dto: LoginUserDto) {
    const user = await this.findByEmail(dto.email);
    if (!user || !user.hpassword) {
      throw new BadRequestException('Invalid email or password!');
    }

    const isMatch = await bcrypt.compare(dto.password, user.hpassword);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password!');
    }

    const token = this.signToken(user);
    return {
      message: 'User logged in successfully!',
      token,
      user: this.sanitizeUser(user),
    };
  }

  async update(userId: string, dto: UpdateUserDto) {
    const fieldsToUpdate: Partial<NewUser> = {};

    if (dto.username !== undefined && dto.username.trim() !== '') {
      fieldsToUpdate.username = dto.username.trim();
    }

    if (dto.email !== undefined && dto.email.trim() !== '') {
      const formattedEmail = dto.email.trim().toLowerCase();
      const existingUser = await this.findByEmail(formattedEmail);
      if (existingUser && existingUser.id !== userId) {
        throw new BadRequestException('Email is already in use by another user');
      }
      fieldsToUpdate.email = formattedEmail;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new BadRequestException('No valid fields to update');
    }

    const updated = await this.usersRepository.update(userId, fieldsToUpdate);

    if (!updated) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User updated successfully!',
      user: this.sanitizeUser(updated),
    };
  }

  async getProfile(userId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      user: this.sanitizeUser(user),
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    if (dto.oldPassword === dto.newPassword) {
      throw new BadRequestException('New password must be different from old password');
    }

    const user = await this.findById(userId);
    if (!user || !user.hpassword) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.oldPassword, user.hpassword);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect!');
    }

    const salt = 10;
    const hpassword = await bcrypt.hash(dto.newPassword, salt);

    await this.usersRepository.update(userId, { hpassword });

    return {
      message: 'Password changed successfully!',
    };
  }

  async googleOAuth(dto: GoogleOAuthDto) {
    const googleUser = await this.googleAuthService.verifyGoogleToken(dto.token);
    if (!googleUser) {
      throw new BadRequestException('Invalid Google token');
    }

    const { google_ID, email, name } = googleUser;
    const username =
      (name && name.replace(/\s+/g, '_').toLowerCase()) ||
      `user_${google_ID.slice(0, 6)}`;

    let user = await this.findByGoogleId(google_ID);

    if (!user) {
      user = await this.findByEmail(email);
      if (user) {
        user = (await this.usersRepository.update(user.id, { google_id: google_ID })) || user;
      } else {
        user = await this.usersRepository.create({
          username,
          email,
          google_id: google_ID,
        });
      }
    }

    const token = this.signToken(user);
    return {
      message: 'User logged in successfully via Google OAuth!',
      token,
      user: this.sanitizeUser(user),
    };
  }
}
