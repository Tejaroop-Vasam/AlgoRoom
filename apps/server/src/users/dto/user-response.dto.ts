import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: 'usr_123' })
  id: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: false })
  is_admin: boolean;

  @ApiProperty()
  created_at: Date;
}

export class ProfileResponseDto {
  @ApiProperty({ type: UserProfileDto })
  user: UserProfileDto;
}
