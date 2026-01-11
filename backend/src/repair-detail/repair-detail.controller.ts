// src/repair-detail/repair-detail.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RepairDetailService } from './repair-detail.service';

@Controller('repair-detail')
@UseGuards(JwtAuthGuard)
export class RepairDetailController {
  constructor(private readonly repairDetailService: RepairDetailService) {}

  @Get(':id')
  async getRepairDetail(@Param('id') id: string) { // ← ไม่ใช้ ParseIntPipe
    return this.repairDetailService.getTicketDetail(id); // ← เรียกชื่อ method ให้ตรง
  }
}