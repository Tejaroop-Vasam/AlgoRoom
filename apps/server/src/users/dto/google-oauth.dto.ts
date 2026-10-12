import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleOAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
