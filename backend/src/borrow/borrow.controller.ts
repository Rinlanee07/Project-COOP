import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { BorrowService, CreateBorrowDto, ReturnBorrowDto } from './borrow.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('borrows')
@UseGuards(JwtAuthGuard)
export class BorrowController {
    constructor(private readonly borrowService: BorrowService) { }

    @Post()
    async createBorrow(@Request() req, @Body() createDto: CreateBorrowDto) {
        const userId = req.user.sub;
        return this.borrowService.createBorrow(createDto, userId);
    }

    @Patch(':id/return')
    async returnBorrow(@Param('id') id: string, @Body() returnDto: ReturnBorrowDto) {
        return this.borrowService.returnBorrow(id, returnDto);
    }

    @Get()
    async getBorrows(@Query('status') status?: string) {
        return this.borrowService.getAllBorrows(status);
    }

    @Get(':id')
    async getBorrow(@Param('id') id: string) {
        return this.borrowService.getBorrow(id);
    }
}
