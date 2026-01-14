import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class CreateRepairLogDto {
    ticket_id: string;
    action_taken: string;
    parts_used?: string;
    cost?: number;
}

@Injectable()
export class RepairLogService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createDto: CreateRepairLogDto) {
        return this.prisma.repairLog.create({
            data: {
                ticket_id: createDto.ticket_id,
                technician_id: userId,
                action_taken: createDto.action_taken,
                parts_used: createDto.parts_used,
                cost: createDto.cost,
            },
            include: {
                Technician: {
                    select: { username: true, email: true }
                }
            }
        });
    }

    async findByTicket(ticketId: string) {
        return this.prisma.repairLog.findMany({
            where: { ticket_id: ticketId },
            orderBy: { repair_date: 'desc' },
            include: {
                Technician: {
                    select: { username: true }
                }
            }
        });
    }
}
