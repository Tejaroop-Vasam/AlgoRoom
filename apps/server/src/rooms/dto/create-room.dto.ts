import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'Room name' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ['RACE', 'COOP'], description: 'Room mode' })
  @IsEnum(['RACE', 'COOP'])
  mode: 'RACE' | 'COOP';

  @ApiProperty({ type: [Number], description: 'List of problem IDs' })
  @IsArray()
  problemIds: number[];

  @ApiProperty({ description: 'Max participants', default: 4 })
  @IsNumber()
  maxParticipants: number;

  @ApiProperty({ description: 'Hidden test cases', default: true })
  @IsBoolean()
  hiddenTestCases: boolean;

  @ApiProperty({ enum: ['OBSCURED', 'HOST_ONLY', 'OPEN'], description: 'Buffer visibility' })
  @IsEnum(['OBSCURED', 'HOST_ONLY', 'OPEN'])
  bufferVisibility: 'OBSCURED' | 'HOST_ONLY' | 'OPEN';
}
