import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Injectable()
export class PartsService {
  constructor(private prisma: PrismaService) {}

  async create(createPartDto: CreatePartDto, created_by: string) {
    return this.prisma.part.create({
      data: {
        part_no: createPartDto.part_no,
        description: createPartDto.description,
        created_by,
      },
    });
  }

  async findAll() {
    return this.prisma.part.findMany({
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
    const part = await this.prisma.part.findUnique({
      where: { id },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!part) {
      throw new NotFoundException(`Part with ID ${id} not found`);
    }
    return part;
  }

  async update(id: number, updatePartDto: UpdatePartDto) {
    const part = await this.prisma.part.findUnique({
      where: { id },
    });
    if (!part) {
      throw new NotFoundException(`Part with ID ${id} not found`);
    }

    return this.prisma.part.update({
      where: { id },
      data: updatePartDto,
    });
  }

  async remove(id: number) {
    const part = await this.prisma.part.findUnique({
      where: { id },
    });
    if (!part) {
      throw new NotFoundException(`Part with ID ${id} not found`);
    }

    return this.prisma.part.delete({
      where: { id },
    });
  }
}