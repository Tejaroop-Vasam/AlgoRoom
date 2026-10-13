import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Please provide old and new password' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Please provide old and new password' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  newPassword: string;
}
