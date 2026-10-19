import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProblemsService } from './problems.service';
import { ProblemQueryDto } from './dto/problem-query.dto';
import { ProblemDetailResponseDto, ProblemsListResponseDto } from './dto/problem-response.dto';

@ApiTags('Problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  @ApiOperation({ summary: 'List and filter DSA problems with pagination' })
  @ApiResponse({ status: 200, description: 'Paginated list of problems', type: ProblemsListResponseDto })
  async getProblems(@Query() query: ProblemQueryDto): Promise<ProblemsListResponseDto> {
    return this.problemsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get DSA problem statement, constraints, and starter codes by ID' })
  @ApiResponse({ status: 200, description: 'Problem statement details', type: ProblemDetailResponseDto })
  async getProblem(@Param('id', ParseIntPipe) id: number): Promise<ProblemDetailResponseDto> {
    return this.problemsService.findById(id);
  }
}
