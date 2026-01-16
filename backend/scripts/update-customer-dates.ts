import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateCustomerDates() {
    try {
        console.log('Updating customer dates...');

        // Update customers with null created_at or updated_at
        const result = await prisma.$executeRaw`
      UPDATE "Customer" 
      SET 
        created_at = COALESCE(created_at, NOW()),
        updated_at = COALESCE(updated_at, NOW())
      WHERE created_at IS NULL OR updated_at IS NULL
    `;

        console.log(`Updated ${result} customer records`);

        // Also update all customers to ensure they have timestamps
        const allCustomers = await prisma.customer.findMany();
        console.log(`Total customers: ${allCustomers.length}`);

        for (const customer of allCustomers) {
            console.log(`Customer ${customer.customer_id}: created_at=${customer.created_at}, updated_at=${customer.updated_at}`);
        }

    } catch (error) {
        console.error('Error updating customer dates:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateCustomerDates();
