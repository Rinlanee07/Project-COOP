import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { UploadModule } from './upload/upload.module';
import { RepairDetailModule } from './repair-detail/repair-detail.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SettingsModule } from './settings/settings.module';
import { BorrowModule } from './borrow/borrow.module';
import { DeviceModule } from './device/device.module';
import { RepairLogModule } from './repair-log/repair-log.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    TicketModule,
    UploadModule,
    RepairDetailModule,
    SettingsModule,
    BorrowModule,
    DeviceModule,
    RepairLogModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
