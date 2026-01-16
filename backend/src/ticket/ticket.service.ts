import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { UploadService } from '../upload/upload.service';

export class CreateTicketDto {
  subject: string;
  description: string;
  priority?: string;
  customer_id: string;
  device_id?: string;
  accessories?: string;
  remark?: string;
  // New fields
  sent_by?: string;
  received_by?: string;
  engineer_comment?: string;
  purchase_date?: string;
  technician_name?: string; // Add technician name field
  parts?: Array<{
    part_number?: string;
    description: string;
    quantity: number;
  }> | string; // Allow string for FormData JSON parsing
}

export interface UpdateTicketStatusDto {
  status: string;
  update_detail?: string;
}

export class UpdateTicketDto {
  description?: string;
  priority?: string;
  accessories?: string;
  remark?: string;
  sent_by?: string;
  received_by?: string;
  engineer_comment?: string;
  technician_name?: string;
  purchase_date?: string;
  is_chargeable?: boolean;
  parts?: Array<{
    part_number?: string;
    description: string;
    quantity: number;
  }>;
}

@Injectable()
export class TicketService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService
  ) { }

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
        },
        Attachments: true,
        TicketParts: true,
        assignee: {
          select: {
            username: true,
            email: true
          }
        },
        reporter: {
          select: {
            username: true,
            email: true
          }
        },
        RepairLogs: {
          include: {
            Technician: {
              select: {
                username: true,
                email: true
              }
            }
          },
          orderBy: {
            repair_date: 'desc'
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

  // ... inside TicketService ...

  async createTicket(createDto: CreateTicketDto, userId: string, userRole: string, files?: Array<Express.Multer.File>) {
    // Generate ticket ID (Internal)
    const ticketId = 'T' + Date.now().toString();

    // Generate Display ID: T-YYYY-XXXXX using ticket_running_no
    const year = new Date().getFullYear().toString();
    // Find last ticket of the current year
    const lastTicket = await this.prisma.ticket.findFirst({
      where: {
        ticket_running_no: {
          startsWith: `T-${year}-`
        }
      },
      orderBy: {
        ticket_running_no: 'desc'
      },
      select: {
        ticket_running_no: true
      }
    });

    let sequence = 1;
    if (lastTicket && lastTicket.ticket_running_no) {
      const parts = lastTicket.ticket_running_no.split('-');
      if (parts.length === 3) {
        const lastSeq = parseInt(parts[2]);
        if (!isNaN(lastSeq)) {
          sequence = lastSeq + 1;
        }
      }
    }

    const runningNo = `T-${year}-${sequence.toString().padStart(5, '0')}`;

    const ticket = await this.prisma.ticket.create({
      data: {
        ticket_id: ticketId,
        ticket_running_no: runningNo,
        subject: createDto.subject,
        description: createDto.description,
        priority: createDto.priority || 'Medium',
        customer_id: createDto.customer_id,
        device_id: createDto.device_id,
        reporter_id: userId,
        status: 'New',
        accessories: createDto.accessories,
        remark: createDto.remark,
        sent_by: createDto.sent_by,
        received_by: createDto.received_by,
        engineer_comment: createDto.engineer_comment,
        technician_name: createDto.technician_name,
        purchase_date: createDto.purchase_date ? new Date(createDto.purchase_date) : null,
      },
      include: {
        Customer: true,
        Device: {
          include: {
            DeviceType: true
          }
        },
        TicketParts: true,
      }
    });

    // Create Ticket Parts if any
    if (createDto.parts) {
      let partsData = createDto.parts;

      // Parse if string (from FormData)
      if (typeof partsData === 'string') {
        try {
          partsData = JSON.parse(partsData);
        } catch (e) {
          console.error('Failed to parse parts JSON', e);
          partsData = [];
        }
      }

      if (Array.isArray(partsData) && partsData.length > 0) {
        await this.prisma.ticketPart.createMany({
          data: partsData.map(part => ({
            ticket_id: ticketId,
            part_number: part.part_number,
            description: part.description,
            quantity: Number(part.quantity) || 1
          }))
        });
      }
    }

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

    // Handle File Uploads
    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const uploadResult = await this.uploadService.uploadFile(file);
          await this.prisma.attachment.create({
            data: {
              ticket_id: ticket.ticket_id,
              file_name: uploadResult.fileName,
              file_url: uploadResult.url,
              file_type: file.mimetype,
              uploaded_by: userId
            }
          });
        } catch (error) {
          console.error(`Failed to upload attachment for ticket ${ticketId}`, error);
        }
      }
    }

    // Return the created ticket with parts (need to refetch or manually attach if crucial, but usually fine)
    // Refetch to include parts and attachments
    return this.prisma.ticket.findUnique({
      where: { ticket_id: ticketId },
      include: {
        Customer: true,
        Device: { include: { DeviceType: true } },
        TicketParts: true,
        Attachments: true
      }
    });
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

  async updateTicket(id: string, updateDto: UpdateTicketDto, userId: string, userRole: string, files?: Array<Express.Multer.File>) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { ticket_id: id }
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    // Only ADMIN or assigned technician can update ticket
    if (userRole !== 'ADMIN' && ticket.assigned_to !== userId && ticket.reporter_id !== userId) {
      throw new UnauthorizedException('You do not have permission to update this ticket');
    }

    // Prepare update data
    const updateData: any = {};

    if (updateDto.description !== undefined) updateData.description = updateDto.description;
    if (updateDto.priority !== undefined) updateData.priority = updateDto.priority;
    if (updateDto.accessories !== undefined) updateData.accessories = updateDto.accessories;
    if (updateDto.remark !== undefined) updateData.remark = updateDto.remark;
    if (updateDto.sent_by !== undefined) updateData.sent_by = updateDto.sent_by;
    if (updateDto.received_by !== undefined) updateData.received_by = updateDto.received_by;
    if (updateDto.engineer_comment !== undefined) updateData.engineer_comment = updateDto.engineer_comment;
    if (updateDto.technician_name !== undefined) updateData.technician_name = updateDto.technician_name;
    if (updateDto.is_chargeable !== undefined) updateData.is_chargeable = updateDto.is_chargeable;
    if (updateDto.purchase_date !== undefined) {
      updateData.purchase_date = updateDto.purchase_date ? new Date(updateDto.purchase_date) : null;
    }

    // Update ticket
    const updatedTicket = await this.prisma.ticket.update({
      where: { ticket_id: id },
      data: updateData,
      include: {
        Customer: true,
        Device: {
          include: {
            DeviceType: true
          }
        },
        TicketParts: true,
        Attachments: true
      }
    });

    // Update parts if provided
    if (updateDto.parts !== undefined) {
      // Delete existing parts
      await this.prisma.ticketPart.deleteMany({
        where: { ticket_id: id }
      });

      // Create new parts
      if (Array.isArray(updateDto.parts) && updateDto.parts.length > 0) {
        await this.prisma.ticketPart.createMany({
          data: updateDto.parts.map(part => ({
            ticket_id: id,
            part_number: part.part_number,
            description: part.description,
            quantity: Number(part.quantity) || 1
          }))
        });
      }
    }

    // Create update record
    await this.prisma.ticket_Update.create({
      data: {
        ticket_id: id,
        update_type: 'UPDATE',
        update_detail: 'Ticket details updated',
        updated_by: userId
      }
    });

    // Handle File Uploads (new images)
    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const uploadResult = await this.uploadService.uploadFile(file);
          await this.prisma.attachment.create({
            data: {
              ticket_id: id,
              file_name: uploadResult.fileName,
              file_url: uploadResult.url,
              file_type: file.mimetype,
              uploaded_by: userId
            }
          });
        } catch (error) {
          console.error(`Failed to upload attachment for ticket ${id}`, error);
        }
      }
    }

    // Return updated ticket with all relations
    return this.prisma.ticket.findUnique({
      where: { ticket_id: id },
      include: {
        Customer: true,
        Device: { include: { DeviceType: true } },
        TicketParts: true,
        Attachments: true,
        assignee: {
          select: {
            username: true,
            email: true
          }
        },
        RepairLogs: {
          include: {
            Technician: {
              select: {
                username: true,
                email: true
              }
            }
          },
          orderBy: {
            repair_date: 'desc'
          }
        }
      }
    });
  }
}