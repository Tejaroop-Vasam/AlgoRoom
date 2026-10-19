import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum FormatLanguage {
  PYTHON = 'python',
  CPP = 'cpp',
  JAVA = 'java',
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
}

export class FormatCodeDto {
  @ApiProperty({
    enum: FormatLanguage,
    enumName: 'FormatLanguage',
    description: 'Programming language to format',
    example: FormatLanguage.PYTHON,
  })
  @IsEnum(FormatLanguage)
  @IsNotEmpty()
  language: FormatLanguage;

  @ApiProperty({ description: 'Source code to format' })
  @IsString()
  code: string;
}

export class FormatResultDto {
  @ApiProperty({ description: 'Formatted code or original code if formatting failed' })
  code: string;

  @ApiProperty({ description: 'Whether the code was successfully formatted', example: true })
  formatted: boolean;

  @ApiProperty({ description: 'Error message if formatting failed', required: false })
  error?: string;
}
