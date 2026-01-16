import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCustomerDates() {
    const customers = await prisma.customer.findMany({
        select: {
            customer_id: true,
            customer_name: true,
            created_at: true,
            updated_at: true
        },
        orderBy: { customer_id: 'asc' }
    });

    console.log('=== Customer Dates in Database ===\n');
    customers.forEach(c => {
        console.log(`ID: ${c.customer_id}`);
        console.log(`Name: ${c.customer_name}`);
        console.log(`Created: ${c.created_at} (${typeof c.created_at})`);
        console.log(`Updated: ${c.updated_at} (${typeof c.updated_at})`);
        console.log('---');
    });

    await prisma.$disconnect();
}

checkCustomerDates();
