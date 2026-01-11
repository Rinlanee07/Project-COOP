// src/ticket/ticket.module.ts
import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { AuthModule } from '../auth/auth.module'; // ← เพิ่มบรรทัดนี้
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [AuthModule], // ← สำคัญมาก: เพิ่ม AuthModule ที่นี่
  controllers: [TicketController],
  providers: [TicketService, PrismaService],
})
export class TicketModule {}