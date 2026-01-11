import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateTicketDto {
  subject: string;
  description: string;
  priority?: string;
  customer_id: string;
  device_id?: string;
}

export interface UpdateTicketStatusDto {
  status: string;
  update_detail?: string;
}

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async getTickets(userId: string, userRole: string, filters?: {
    startDate?: string;
    endDate?: string;
  }) {
    let whereClause: any = {};

    // Apply date filters
    if (filters?.startDate && filters?.endDate) {
      whereClause.created_at = {
        gte: new Date(filters.startDate),
        lte: new Date(filters.endDate),
      };
    }

    if (userRole === 'MEMBER') {
      whereClause.OR = [
        { reporter_id: userId },
        { assigned_to: userId }
      ];
    }

    return this.prisma.ticket.findMany({
      where: whereClause,
      include: {
        Customer: true,
        Device: {
          include: {
            DeviceType: true
          }
        },
        Updates: {
          include: {
            User: {
              select: {
                username: true,
                user_role: true
              }
            }
          },
          orderBy: {
            updated_at: 'desc'
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async getTicket(id: string, userId: string, userRole: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { ticket_id: id },
      include: {
        Customer: true,
        Device: {
          include: {
            DeviceType: true
          }
        },
        Updates: {
          include: {
            User: {
              select: {
                username: true,
                user_role: true
              }
            }
          },
          orderBy: {
            updated_at: 'desc'
          }
        }
      }
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (userRole === 'MEMBER' && ticket.reporter_id !== userId && ticket.assigned_to !== userId) {
      throw new UnauthorizedException('You do not have permission to view this ticket');
    }

    return ticket;
  }

  async createTicket(createDto: CreateTicketDto, userId: string, userRole: string) {
    // Generate ticket ID
    const ticketId = 'T' + Date.now().toString();

    const ticket = await this.prisma.ticket.create({
      data: {
        ticket_id: ticketId,
        subject: createDto.subject,
        description: createDto.description,
        priority: createDto.priority || 'Medium',
        customer_id: createDto.customer_id,
        device_id: createDto.device_id,
        reporter_id: userId,
        status: 'New',
      },
      include: {
        Customer: true,
        Device: {
          include: {
            DeviceType: true
          }
        }
      }
    });

    // Create initial status update
    await this.prisma.ticket_Update.create({
      data: {
        ticket_id: ticket.ticket_id,
        update_type: 'STATUS',
        new_status: 'New',
        update_detail: 'Ticket created',
        updated_by: userId
      }
    });

    return ticket;
  }

  async updateTicketStatus(id: string, updateDto: UpdateTicketStatusDto, userId: string, userRole: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { ticket_id: id }
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    // Only ADMIN or assigned technician can update status
    if (userRole !== 'ADMIN' && ticket.assigned_to !== userId) {
      throw new UnauthorizedException('You do not have permission to update this ticket');
    }

    const updatedTicket = await this.prisma.ticket.update({
      where: { ticket_id: id },
      data: { status: updateDto.status },
      include: {
        Customer: true,
        Device: {
          include: {
            DeviceType: true
          }
        }
      }
    });

    // Create status update record
    await this.prisma.ticket_Update.create({
      data: {
        ticket_id: id,
        update_type: 'STATUS',
        new_status: updateDto.status,
        update_detail: updateDto.update_detail || `Status changed to ${updateDto.status}`,
        updated_by: userId
      }
    });

    return updatedTicket;
  }
}