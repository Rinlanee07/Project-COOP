import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class CreateBorrowDto {
    device_id: string;
    borrower_name: string;
    contact_info?: string;
    due_date: string; // ISO Date string
    deposit_amount?: number;
    notes?: string;
}

export class ReturnBorrowDto {
    status: 'RETURNED' | 'LOST' | 'DAMAGED';
    notes?: string;
    return_date?: string; // Optional override
}

@Injectable()
export class BorrowService {
    constructor(private prisma: PrismaService) { }

    async createBorrow(createDto: CreateBorrowDto, userId: string) {
        const { device_id, borrower_name, contact_info, due_date, deposit_amount, notes } = createDto;

        // Check if device exists
        const device = await this.prisma.device.findUnique({
            where: { device_id },
            include: {
                DeviceType: true
            }
        });

        if (!device) {
            throw new NotFoundException('Device not found');
        }

        // Check if currently borrowed (Status = BORROWED matches)
        // Optional: Add logic to prevent double borrowing if needed.

        return this.prisma.borrowTransaction.create({
            data: {
                device_id,
                borrower_name,
                contact_info,
                due_date: new Date(due_date),
                deposit_amount: deposit_amount,
                notes,
                status: 'BORROWED',
                handled_by: userId
            },
            include: {
                Device: {
                    include: {
                        DeviceType: true
                    }
                },
                User: {
                    select: {
                        username: true
                    }
                }
            }
        });
    }

    async returnBorrow(transactionId: string, returnDto: ReturnBorrowDto) {
        const transaction = await this.prisma.borrowTransaction.findUnique({
            where: { transaction_id: transactionId }
        });

        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }

        return this.prisma.borrowTransaction.update({
            where: { transaction_id: transactionId },
            data: {
                status: returnDto.status,
                return_date: returnDto.return_date ? new Date(returnDto.return_date) : new Date(),
                notes: returnDto.notes ? (transaction.notes ? transaction.notes + '\n' + returnDto.notes : returnDto.notes) : transaction.notes
            }
        });
    }

    async getAllBorrows(status?: string) {
        const where: any = {};
        if (status) {
            where.status = status;
        }

        return this.prisma.borrowTransaction.findMany({
            where,
            include: {
                Device: {
                    include: {
                        DeviceType: true
                    }
                },
                User: {
                    select: {
                        username: true
                    }
                }
            },
            orderBy: {
                borrow_date: 'desc'
            }
        });
    }

    async getBorrow(id: string) {
        const transaction = await this.prisma.borrowTransaction.findUnique({
            where: { transaction_id: id },
            include: {
                Device: {
                    include: {
                        DeviceType: true
                    }
                },
                User: {
                    select: {
                        username: true
                    }
                }
            }
        });

        if (!transaction) throw new NotFoundException('Transaction not found');
        return transaction;
    }
}
