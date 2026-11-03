import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  Min,
  Max,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'Room name' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ['RACE', 'COOP'], description: 'Room mode' })
  @IsEnum(['RACE', 'COOP'])
  mode: 'RACE' | 'COOP';

  @ApiProperty({ type: [Number], description: 'List of problem IDs (1 to 5 problems)' })
  @IsArray()
  @ArrayMinSize(1, { message: 'Add at least one problem to the challenge set.' })
  @ArrayMaxSize(5, { message: 'Up to 5 problems allowed.' })
  @IsNumber({}, { each: true })
  problemIds: number[];

  @ApiProperty({ description: 'Max participants', default: 4, minimum: 2, maximum: 8 })
  @IsNumber()
  @Min(2, { message: 'Minimum 2 participants required.' })
  @Max(8, { message: 'Maximum 8 participants allowed.' })
  maxParticipants: number;

  @ApiProperty({ description: 'Hidden test cases', default: true })
  @IsBoolean()
  hiddenTestCases: boolean;

  @ApiProperty({ enum: ['OBSCURED', 'HOST_ONLY', 'OPEN'], description: 'Buffer visibility' })
  @IsEnum(['OBSCURED', 'HOST_ONLY', 'OPEN'])
  bufferVisibility: 'OBSCURED' | 'HOST_ONLY' | 'OPEN';
}