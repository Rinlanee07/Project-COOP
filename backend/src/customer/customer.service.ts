import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Customer, Device, Cust_Device, DeviceType } from '@prisma/client';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) { }

    async createCustomerWithDevices(data: {
        customer_name: string;
        company_name?: string;
        phone_number: string;
        contact_person: string;
        shop_name?: string;
        shop_address?: any;
        company_address?: any;
        contact_email?: string;
        contact_line_name?: string;
        devices?: Array<{
            serial_number?: string;
            installation_location?: string;
            warranty_end_date?: string;
            device_type: {
                device_type: string;
                brand: string;
                model: string;
                common_issues?: string;
            };
        }>;
        created_by: string;
    }) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Create Customer
            const customer = await tx.customer.create({
                data: {
                    customer_id: Math.random().toString(36).substr(2, 9), // TODO: Better ID generation
                    customer_name: data.customer_name,
                    company_name: data.company_name,
                    contact_person: data.contact_person,
                    phone_number: data.phone_number,
                    contact_tel: data.phone_number,
                    contact_email: data.contact_email,
                    contact_line_id: data.contact_line_name,
                    shop_name: data.shop_name,
                    shop_address: data.shop_address ? JSON.stringify(data.shop_address) : null,
                    company_address: data.company_address ? JSON.stringify(data.company_address) : null,
                    created_by: data.created_by,
                },
            });

            // 2. Process Devices
            if (data.devices && data.devices.length > 0) {
                for (const deviceData of data.devices) {
                    // Find or Create DeviceType
                    let deviceType = await tx.deviceType.findUnique({
                        where: {
                            device_type_brand_model: {
                                device_type: deviceData.device_type.device_type,
                                brand: deviceData.device_type.brand,
                                model: deviceData.device_type.model,
                            },
                        },
                    });

                    if (!deviceType) {
                        deviceType = await tx.deviceType.create({
                            data: {
                                device_type: deviceData.device_type.device_type,
                                brand: deviceData.device_type.brand,
                                model: deviceData.device_type.model,
                                common_issues: deviceData.device_type.common_issues,
                            },
                        });
                    } else if (deviceData.device_type.common_issues) {
                        // Update common issues if provided
                        await tx.deviceType.update({
                            where: { id: deviceType.id },
                            data: { common_issues: deviceData.device_type.common_issues }
                        })
                    }

                    // Create Device
                    const device = await tx.device.create({
                        data: {
                            device_id: Math.random().toString(36).substr(2, 9),
                            serial_number: deviceData.serial_number,
                            installation_location: deviceData.installation_location,
                            warranty_end_date: deviceData.warranty_end_date ? new Date(deviceData.warranty_end_date) : null,
                            device_type_id: deviceType.id,
                        },
                    });

                    // Link Customer to Device
                    await tx.cust_Device.create({
                        data: {
                            customer_id: customer.customer_id,
                            device_id: device.device_id,
                            start_date: new Date(),
                            created_by: data.created_by,
                        }
                    });
                }
            }

            return customer;
        });
    }

    async getCustomerById(id: string) {
        return this.prisma.customer.findUnique({
            where: { customer_id: id },
            include: {
                Cust_Devices: {
                    include: {
                        Device: {
                            include: {
                                DeviceType: true
                            }
                        }
                    }
                }
            }
        });
    }

    async getAllCustomers() {
        return this.prisma.customer.findMany({
            orderBy: { updated_at: 'desc' },
            include: {
                Cust_Devices: {
                    include: {
                        Device: {
                            include: {
                                DeviceType: true
                            }
                        }
                    }
                }
            }
        })
    }
}
