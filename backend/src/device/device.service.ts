import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.device.findMany({
            include: {
                DeviceType: true
            }
        });
    }

    async findAllDeviceTypes() {
        return this.prisma.deviceType.findMany({
            orderBy: { device_type: 'asc' }
        });
    }

    async findBySerial(serial: string) {
        const device = await this.prisma.device.findUnique({
            where: { serial_number: serial },
            include: {
                DeviceType: true
            }
        });
        if (!device) return null; // Controller handles 404 or return null
        return device;
    }

    async findOne(id: string) {
        return this.prisma.device.findUnique({
            where: { device_id: id },
            include: { DeviceType: true }
        });
    }
}
