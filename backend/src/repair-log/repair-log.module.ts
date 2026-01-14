import { Module } from '@nestjs/common';
import { RepairLogService } from './repair-log.service';
import { RepairLogController } from './repair-log.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [RepairLogController],
    providers: [RepairLogService],
    exports: [RepairLogService]
})
export class RepairLogModule { }
