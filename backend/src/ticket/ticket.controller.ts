import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TicketService } from './ticket.service';
import type {
  CreateTicketDto,
  UpdateTicketStatusDto,
} from './ticket.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Get()
  async getTickets(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const userId = req.user.sub;
    const userRole = req.user.role; // JWT payload uses 'role' field

    return this.ticketService.getTickets(userId, userRole, {
      startDate,
      endDate,
    });
  }

  @Get(':id')
  async getTicket(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;
    const userRole = req.user.role; // JWT payload uses 'role' field

    return this.ticketService.getTicket(id, userId, userRole);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createTicket(
    @Request() req,
    @Body() createDto: CreateTicketDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const userId = req.user.sub;
    const userRole = req.user.role; // JWT payload uses 'role' field

    return this.ticketService.createTicket(createDto, userId, userRole, files);
  }

  @Patch(':id/status')
  async updateTicketStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateTicketStatusDto,
  ) {
    const userId = req.user.sub;
    const userRole = req.user.role; // JWT payload uses 'role' field

    return this.ticketService.updateTicketStatus(id, updateDto, userId, userRole);
  }
}