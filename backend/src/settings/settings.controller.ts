import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // ปรับ path ตาม project จริง
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private service: SettingsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':key')
  getOne(@Param('key') key: string) {
    return this.service.findOne(key);
  }

  @Post()
  async create(@Body() dto: CreateSettingDto, @Req() req: any) {
    try {
      // สมมติว่า JWT payload มี user_id
      const updatedBy = req.user.user_id;
      return await this.service.create(dto, updatedBy);
    } catch (e) {
      if (e instanceof BadRequestException || e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException('Failed to create setting');
    }
  }

  @Put(':key')
  async update(
    @Param('key') key: string,
    @Body() dto: UpdateSettingDto,
    @Req() req: any,
  ) {
    try {
      const updatedBy = req.user.user_id;
      return await this.service.update(key, dto, updatedBy);
    } catch (e) {
      if (e instanceof BadRequestException || e instanceof NotFoundException) {
        throw e;
      }
      throw new BadRequestException('Failed to update setting');
    }
  }

  @Delete(':key')
  async delete(@Param('key') key: string) {
    try {
      return await this.service.remove(key);
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new BadRequestException('Failed to delete setting');
    }
  }
}