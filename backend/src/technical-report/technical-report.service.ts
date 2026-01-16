import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTechnicalReportDto } from './dto/create-technical-report.dto';
import { UpdateTechnicalReportDto } from './dto/update-technical-report.dto';

@Injectable()
export class TechnicalReportService {
  constructor(private prisma: PrismaService) {}

  async create(createTechnicalReportDto: CreateTechnicalReportDto, created_by: string) {
    return this.prisma.technicalReport.create({
      data: {
        name: createTechnicalReportDto.name,
        phone: createTechnicalReportDto.phone,
        created_by,
      },
    });
  }

  async findAll() {
    return this.prisma.technicalReport.findMany({
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const report = await this.prisma.technicalReport.findUnique({
      where: { id },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!report) {
      throw new NotFoundException(`Technical report with ID ${id} not found`);
    }
    return report;
  }

  async update(id: number, updateTechnicalReportDto: UpdateTechnicalReportDto) {
    const report = await this.prisma.technicalReport.findUnique({
      where: { id },
    });
    if (!report) {
      throw new NotFoundException(`Technical report with ID ${id} not found`);
    }
    return this.prisma.technicalReport.update({
      where: { id },
      data: updateTechnicalReportDto,
    });
  }

  async remove(id: number) {
    const report = await this.prisma.technicalReport.findUnique({
      where: { id },
    });
    if (!report) {
      throw new NotFoundException(`Technical report with ID ${id} not found`);
    }
    return this.prisma.technicalReport.delete({
      where: { id },
    });
  }
}