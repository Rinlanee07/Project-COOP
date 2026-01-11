// settings.module.ts
import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { AuthModule } from '../auth/auth.module'; // ← import AuthModule

@Module({
  imports: [AuthModule], // ← สำคัญมาก
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}