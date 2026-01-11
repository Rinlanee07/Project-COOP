// src/repair-detail/repair-detail.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RepairDetailService {
  constructor(private prisma: PrismaService) {}

  // ใน repair-detail.service.ts — เพิ่ม mapping ให้ตรงกับ DTO
  async getTicketDetail(ticketId: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { ticket_id: ticketId },
      include: {
        Customer: true,
        Device: {
          include: { DeviceType: true }
        },
        assignee: {
          select: { user_id: true, username: true, email: true }
        },
        Updates: {
          include: {
            User: { select: { user_id: true, username: true, email: true } }
          },
          orderBy: { updated_at: 'desc' }
        }
      }
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    // Map ให้ตรงกับ TicketDetailDto
    return {
      ticket_id: ticket.ticket_id,
      subject: ticket.subject,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      customer: {
        customer_id: ticket.Customer.customer_id,
        customer_name: ticket.Customer.customer_name,
        company_name: ticket.Customer.company_name,
        phone_number: ticket.Customer.phone_number,
        contact_email: ticket.Customer.contact_email,
        address: ticket.Customer.address,
        company_address: ticket.Customer.company_address,
      },
      device: ticket.Device
        ? {
            device_id: ticket.Device.device_id,
            serial_number: ticket.Device.serial_number,
            installation_location: ticket.Device.installation_location,
            warranty_end_date: ticket.Device.warranty_end_date,
            DeviceType: ticket.Device.DeviceType
              ? {
                  id: ticket.Device.DeviceType.id,
                  device_type: ticket.Device.DeviceType.device_type,
                  brand: ticket.Device.DeviceType.brand,
                  model: ticket.Device.DeviceType.model,
                }
              : undefined,
          }
        : undefined,
      technician: ticket.assignee
        ? {
            user_id: ticket.assignee.user_id,
            username: ticket.assignee.username,
            email: ticket.assignee.email,
          }
        : undefined,
      updates: ticket.Updates.map(update => ({
        update_id: update.update_id,
        update_type: update.update_type,
        update_detail: update.update_detail,
        new_status: update.new_status,
        updated_at: update.updated_at,
        User: {
          user_id: update.User.user_id,
          username: update.User.username,
          email: update.User.email,
        },
      })),
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
    };
  }
  }
