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

                    // Check if device with this serial number already exists
                    let device;
                    if (deviceData.serial_number) {
                        device = await tx.device.findUnique({
                            where: { serial_number: deviceData.serial_number }
                        });
                    }

                    // Create new device if it doesn't exist
                    if (!device) {
                        device = await tx.device.create({
                            data: {
                                device_id: Math.random().toString(36).substr(2, 9),
                                serial_number: deviceData.serial_number || null,
                                installation_location: deviceData.installation_location,
                                warranty_end_date: deviceData.warranty_end_date ? new Date(deviceData.warranty_end_date) : null,
                                device_type_id: deviceType.id,
                            },
                        });
                    }

                    // Link Customer to Device (check if link already exists)
                    const existingLink = await tx.cust_Device.findFirst({
                        where: {
                            customer_id: customer.customer_id,
                            device_id: device.device_id
                        }
                    });

                    if (!existingLink) {
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
            }

            // Re-fetch customer with all relations to return complete data
            const customerWithDevices = await tx.customer.findUnique({
                where: { customer_id: customer.customer_id },
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

            return customerWithDevices;
        });
    }

    async getCustomerById(id: string) {
        const customer = await this.prisma.customer.findUnique({
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

        console.log('Customer from DB:', {
            customer_id: customer?.customer_id,
            created_at: customer?.created_at,
            updated_at: customer?.updated_at,
            created_at_type: typeof customer?.created_at
        });

        if (!customer) return null;

        // Transform dates and nested objects
        return {
            ...customer,
            created_at: customer.created_at?.toISOString(),
            updated_at: customer.updated_at?.toISOString(),
            Cust_Devices: customer.Cust_Devices?.map(cd => ({
                ...cd,
                Device: cd.Device ? {
                    ...cd.Device,
                    created_at: cd.Device.created_at?.toISOString(),
                    updated_at: cd.Device.updated_at?.toISOString(),
                    DeviceType: cd.Device.DeviceType ? {
                        ...cd.Device.DeviceType,
                        created_at: cd.Device.DeviceType.created_at?.toISOString(),
                        updated_at: cd.Device.DeviceType.updated_at?.toISOString()
                    } : null
                } : null
            }))
        };
    }

    async getAllCustomers() {
        const customers = await this.prisma.customer.findMany({
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
        });

        // Debug logging
        if (customers.length > 0) {
            console.log('First customer from DB:', {
                id: customers[0].customer_id,
                created_at: customers[0].created_at,
                updated_at: customers[0].updated_at,
                devices_count: customers[0].Cust_Devices?.length,
                first_device: customers[0].Cust_Devices?.[0] ? {
                    device_id: customers[0].Cust_Devices[0].Device?.device_id,
                    serial: customers[0].Cust_Devices[0].Device?.serial_number,
                    device_type: customers[0].Cust_Devices[0].Device?.DeviceType?.device_type,
                    brand: customers[0].Cust_Devices[0].Device?.DeviceType?.brand
                } : null
            });
        }

        // Transform dates and nested objects to fix serialization issue
        return customers.map(customer => ({
            ...customer,
            created_at: customer.created_at?.toISOString(),
            updated_at: customer.updated_at?.toISOString(),
            Cust_Devices: customer.Cust_Devices?.map(cd => ({
                ...cd,
                Device: cd.Device ? {
                    ...cd.Device,
                    created_at: cd.Device.created_at?.toISOString(),
                    updated_at: cd.Device.updated_at?.toISOString(),
                    DeviceType: cd.Device.DeviceType ? {
                        ...cd.Device.DeviceType,
                        created_at: cd.Device.DeviceType.created_at?.toISOString(),
                        updated_at: cd.Device.DeviceType.updated_at?.toISOString()
                    } : null
                } : null
            }))
        }));
    }

    async updateCustomer(id: string, data: {
        customer_name?: string;
        company_name?: string;
        phone_number?: string;
        contact_person?: string;
        shop_name?: string;
        shop_address?: any;
        company_address?: any;
        contact_email?: string;
        contact_line_name?: string;
        devices?: Array<{
            device_id?: string; // If provided, update existing device
            serial_number?: string;
            installation_location?: string;
            warranty_end_date?: string;
            device_type?: {
                device_type: string;
                brand: string;
                model: string;
                common_issues?: string;
            };
        }>;
        updated_by?: string;
    }) {
        return this.prisma.$transaction(async (tx) => {
            // Update customer basic info
            const updateData: any = {};
            if (data.customer_name !== undefined) updateData.customer_name = data.customer_name;
            if (data.company_name !== undefined) updateData.company_name = data.company_name;
            if (data.phone_number !== undefined) {
                updateData.phone_number = data.phone_number;
                updateData.contact_tel = data.phone_number;
            }
            if (data.contact_person !== undefined) updateData.contact_person = data.contact_person;
            if (data.contact_email !== undefined) updateData.contact_email = data.contact_email;
            if (data.contact_line_name !== undefined) updateData.contact_line_id = data.contact_line_name;
            if (data.shop_name !== undefined) updateData.shop_name = data.shop_name;
            if (data.shop_address !== undefined) updateData.shop_address = data.shop_address ? JSON.stringify(data.shop_address) : null;
            if (data.company_address !== undefined) updateData.company_address = data.company_address ? JSON.stringify(data.company_address) : null;

            const customer = await tx.customer.update({
                where: { customer_id: id },
                data: updateData
            });

            // Handle device updates if provided
            if (data.devices) {
                for (const deviceData of data.devices) {
                    if (deviceData.device_id) {
                        // Update existing device
                        await tx.device.update({
                            where: { device_id: deviceData.device_id },
                            data: {
                                serial_number: deviceData.serial_number,
                                installation_location: deviceData.installation_location,
                                warranty_end_date: deviceData.warranty_end_date ? new Date(deviceData.warranty_end_date) : null
                            }
                        });
                    }
                    // Note: Creating new devices can be done through the create endpoint
                }
            }

            return this.getCustomerById(id);
        });
    }

    async deleteCustomer(id: string) {
        // Check if customer has active tickets
        const ticketCount = await this.prisma.ticket.count({
            where: { customer_id: id }
        });

        if (ticketCount > 0) {
            throw new Error(`Cannot delete customer with ${ticketCount} existing ticket(s). Please archive the customer instead.`);
        }

        return this.prisma.$transaction(async (tx) => {
            // Delete customer-device relationships
            await tx.cust_Device.deleteMany({
                where: { customer_id: id }
            });

            // Delete customer
            await tx.customer.delete({
                where: { customer_id: id }
            });

            return { message: 'Customer deleted successfully' };
        });
    }
}
