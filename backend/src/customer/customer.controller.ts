import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    create(@Body() createCustomerDto: any, @Request() req) {
        return this.customerService.createCustomerWithDevices({
            ...createCustomerDto,
            created_by: req.user.sub || req.user.userId
        });
    }

    @Get()
    findAll() {
        return this.customerService.getAllCustomers();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customerService.getCustomerById(id);
    }
}
