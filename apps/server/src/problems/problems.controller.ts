import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProblemsService } from './problems.service';
import { ProblemQueryDto } from './dto/problem-query.dto';

@ApiTags('Problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  @ApiOperation({ summary: 'List and filter DSA problems with pagination' })
  async getProblems(@Query() query: ProblemQueryDto) {
    return this.problemsService.findAll(query);
  }  

  @Get(':id')
  @ApiOperation({ summary: 'Get DSA problem statement, constraints, and starter codes by ID' })
  async getProblem(@Param('id', ParseIntPipe) id: number) {
    return this.problemsService.findById(id);
  }
}
