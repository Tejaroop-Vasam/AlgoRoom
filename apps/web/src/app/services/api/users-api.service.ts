import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import {
  ChangePasswordDto,
  GoogleOAuthDto,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UsersControllerClient,
} from './api-client';
import { ProfileResponse } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly usersClient = inject(UsersControllerClient);

  getProfile(): Promise<ProfileResponse> {
    return firstValueFrom(
      this.usersClient.profile() as unknown as Observable<ProfileResponse>,
    );
  }

  register(dto: RegisterUserDto): Promise<void> {
    return firstValueFrom(this.usersClient.register(dto));
  }

  login(dto: LoginUserDto): Promise<void> {
    return firstValueFrom(this.usersClient.login(dto));
  }

  update(dto: UpdateUserDto): Promise<void> {
    return firstValueFrom(this.usersClient.update(dto));
  }

  changePassword(dto: ChangePasswordDto): Promise<void> {
    return firstValueFrom(this.usersClient.changePassword(dto));
  }

  googleOAuth(dto: GoogleOAuthDto): Promise<void> {
    return firstValueFrom(this.usersClient.googleOAuth(dto));
  }
}
