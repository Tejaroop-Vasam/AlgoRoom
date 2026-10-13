import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Please provide username, email, and password' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Please provide username, email, and password' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Please provide username, email, and password' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
