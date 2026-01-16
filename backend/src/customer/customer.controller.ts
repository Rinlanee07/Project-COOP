import { Controller, Get, Post, Put, Delete, Body, UseGuards, Request, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    async create(@Body() createCustomerDto: any, @Request() req) {
        try {
            const customer = await this.customerService.createCustomerWithDevices({
                ...createCustomerDto,
                created_by: req.user.sub || req.user.userId
            });

            // Transform dates for serialization
            return this.transformCustomer(customer);
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    }

    private transformCustomer(customer: any) {
        if (!customer) return null;

        return {
            ...customer,
            created_at: customer.created_at?.toISOString?.() || customer.created_at,
            updated_at: customer.updated_at?.toISOString?.() || customer.updated_at,
            Cust_Devices: customer.Cust_Devices?.map((cd: any) => ({
                ...cd,
                Device: cd.Device ? {
                    ...cd.Device,
                    created_at: cd.Device.created_at?.toISOString?.() || cd.Device.created_at,
                    updated_at: cd.Device.updated_at?.toISOString?.() || cd.Device.updated_at,
                    DeviceType: cd.Device.DeviceType ? {
                        ...cd.Device.DeviceType,
                        created_at: cd.Device.DeviceType.created_at?.toISOString?.() || cd.Device.DeviceType.created_at,
                        updated_at: cd.Device.DeviceType.updated_at?.toISOString?.() || cd.Device.DeviceType.updated_at
                    } : null
                } : null
            }))
        };
    }

    @Get()
    findAll() {
        return this.customerService.getAllCustomers();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customerService.getCustomerById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCustomerDto: any, @Request() req) {
        return this.customerService.updateCustomer(id, {
            ...updateCustomerDto,
            updated_by: req.user.sub || req.user.userId
        });
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.customerService.deleteCustomer(id);
    }
}
