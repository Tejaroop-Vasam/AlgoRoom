import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GoogleOAuthDto } from './dto/google-oauth.dto';
import { ProfileResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from './interfaces/user.interface';

@ApiTags('Users & Auth')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  async register(@Body() dto: RegisterUserDto) {
    return this.usersService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user with username/email and password' })
  async login(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Put('update')
  @ApiOperation({ summary: 'Update user profile details' })
  async update(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(user.id, dto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Current user profile', type: ProfileResponseDto })
  async profile(@CurrentUser() user: JwtPayload): Promise<ProfileResponseDto> {
    return this.usersService.getProfile(user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  @ApiOperation({ summary: 'Change user password' })
  async changePassword(
    @CurrentUser() user: JwtPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(user.id, dto);
  }

  @Post('google-oauth')
  @ApiOperation({ summary: 'Authenticate or register user with Google OAuth id token' })
  async googleOAuth(@Body() dto: GoogleOAuthDto) {
    return this.usersService.googleOAuth(dto);
  }
}
