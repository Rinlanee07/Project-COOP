import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [BorrowController],
    providers: [BorrowService],
    exports: [BorrowService]
})
export class BorrowModule { }
