import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TechnicalReportService } from './technical-report.service';
import { CreateTechnicalReportDto } from './dto/create-technical-report.dto';
import { UpdateTechnicalReportDto } from './dto/update-technical-report.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('technical-reports')
@UseGuards(JwtAuthGuard)
export class TechnicalReportController {
  constructor(private readonly technicalReportService: TechnicalReportService) {}

  @Post()
  create(@Body() createTechnicalReportDto: CreateTechnicalReportDto, @Request() req) {
    return this.technicalReportService.create(createTechnicalReportDto, req.user.sub || req.user.userId);
  }

  @Get()
  findAll() {
    return this.technicalReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalReportService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTechnicalReportDto: UpdateTechnicalReportDto) {
    return this.technicalReportService.update(+id, updateTechnicalReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalReportService.remove(+id);
  }
}