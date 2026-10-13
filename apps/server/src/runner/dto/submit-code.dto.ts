import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SubmitCodeDto {
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @IsNotEmpty()
  problemId: number;
}
