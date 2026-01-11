import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.setting.findMany({
      orderBy: { setting_key: 'asc' },
    });
  }

  findOne(setting_key: string) {
    return this.prisma.setting.findUnique({
      where: { setting_key },
    });
  }

  async create(dto: CreateSettingDto, updatedBy: string) {
    // ตรวจสอบว่า key ซ้ำหรือไม่
    const existing = await this.prisma.setting.findUnique({
      where: { setting_key: dto.setting_key },
    });
    if (existing) {
      throw new BadRequestException('Setting key already exists');
    }

    return this.prisma.setting.create({
      data: {
        setting_key: dto.setting_key,
        setting_value: dto.setting_value,
        description: dto.description,
        updated_by: updatedBy, // camelCase ตรงกับ Prisma Client
      },
    });
  }

  async update(setting_key: string, dto: UpdateSettingDto, updatedBy: string) {
    const existing = await this.prisma.setting.findUnique({
      where: { setting_key },
    });
    if (!existing) {
      throw new NotFoundException(`Setting key "${setting_key}" not found`);
    }

    return this.prisma.setting.update({
      where: { setting_key },
      data: {
        ...dto,
        updated_by: updatedBy, // camelCase
      },
    });
  }

  async remove(setting_key: string) {
    const existing = await this.prisma.setting.findUnique({
      where: { setting_key },
    });
    if (!existing) {
      throw new NotFoundException(`Setting key "${setting_key}" not found`);
    }

    return this.prisma.setting.delete({
      where: { setting_key },
    });
  }
}