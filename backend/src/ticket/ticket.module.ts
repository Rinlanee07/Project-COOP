import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [AuthModule, PrismaModule, UploadModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule { }