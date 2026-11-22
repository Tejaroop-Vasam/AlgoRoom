import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  AuthResultDto,
  ChangePasswordDto,
  GoogleOAuthDto,
  LoginUserDto,
  MessageDto,
  ProfileResponseDto,
  RegisterUserDto,
  UpdateUserDto,
  UserResultDto,
  UsersControllerClient,
} from './api-client';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly usersClient = inject(UsersControllerClient);

  getProfile(): Promise<ProfileResponseDto> {
    return firstValueFrom(this.usersClient.profile());
  }

  register(dto: RegisterUserDto): Promise<UserResultDto> {
    return firstValueFrom(this.usersClient.register(dto));
  }

  login(dto: LoginUserDto): Promise<AuthResultDto> {
    return firstValueFrom(this.usersClient.login(dto));
  }

  update(dto: UpdateUserDto): Promise<UserResultDto> {
    return firstValueFrom(this.usersClient.update(dto));
  }

  changePassword(dto: ChangePasswordDto): Promise<MessageDto> {
    return firstValueFrom(this.usersClient.changePassword(dto));
  }

  googleOAuth(dto: GoogleOAuthDto): Promise<AuthResultDto> {
    return firstValueFrom(this.usersClient.googleOAuth(dto));
  }
}
