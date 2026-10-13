import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RunCodeDto {
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @IsOptional()
  problemId?: number;

  @IsString()
  @IsOptional()
  input?: string;
}
