import { Module } from '@nestjs/common';
import { TechnicalReportService } from './technical-report.service';
import { TechnicalReportController } from './technical-report.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TechnicalReportController],
  providers: [TechnicalReportService],
  exports: [TechnicalReportService],
})
export class TechnicalReportModule {}