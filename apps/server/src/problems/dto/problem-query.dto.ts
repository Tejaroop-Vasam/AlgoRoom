import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProblemQueryDto {
  @ApiPropertyOptional({ enum: ['EASY', 'MEDIUM', 'HARD'], description: 'Difficulty level' })
  @IsEnum(['EASY', 'MEDIUM', 'HARD'])
  @IsOptional()
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';

  @ApiPropertyOptional({ description: 'Search term by problem title or description' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Page limit', default: 20 })
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 20;
}
