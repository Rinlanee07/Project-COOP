// src/repair-detail/repair-detail.module.ts
import { Module } from '@nestjs/common';
import { RepairDetailController } from './repair-detail.controller';
import { RepairDetailService } from './repair-detail.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RepairDetailController],
  providers: [RepairDetailService, PrismaService],
})
export class RepairDetailModule {}