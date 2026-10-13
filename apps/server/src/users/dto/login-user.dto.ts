import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Please provide email and password' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Please provide email and password' })
  password: string;
}
