import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) { }

    @Get()
    findAll() {
        return this.deviceService.findAll();
    }

    @Get('types')
    async getTypes() {
        return this.deviceService.findAllDeviceTypes();
    }

    @Get('serial/:serial')
    async findBySerial(@Param('serial') serial: string) {
        return this.deviceService.findBySerial(serial);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.deviceService.findOne(id);
    }
}
