import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { RepairLogService, CreateRepairLogDto } from './repair-log.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('repair-logs')
@UseGuards(JwtAuthGuard)
export class RepairLogController {
    constructor(private readonly repairLogService: RepairLogService) { }

    @Post()
    async create(@Request() req, @Body() createDto: CreateRepairLogDto) {
        const userId = req.user.userId;
        return this.repairLogService.create(userId, createDto);
    }

    @Get('ticket/:ticketId')
    async findByTicket(@Param('ticketId') ticketId: string) {
        return this.repairLogService.findByTicket(ticketId);
    }
}
