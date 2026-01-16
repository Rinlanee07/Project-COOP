import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixCustomerDates() {
    try {
        console.log('Starting to fix customer dates...');

        // Get all customers and check their dates
        const customers = await prisma.customer.findMany({
            select: {
                customer_id: true,
                customer_name: true,
                created_at: true,
                updated_at: true
            }
        });

        console.log(`Found ${customers.length} customers`);

        for (const customer of customers) {
            console.log(`${customer.customer_id} - ${customer.customer_name}:`);
            console.log(`  created_at: ${customer.created_at}`);
            console.log(`  updated_at: ${customer.updated_at}`);
        }

        // Update all customers to set NOW() if dates are null
        const updateResult = await prisma.$executeRaw`
      UPDATE "Customer" 
      SET 
        created_at = CASE WHEN created_at IS NULL THEN NOW() ELSE created_at END,
        updated_at = CASE WHEN updated_at IS NULL THEN NOW() ELSE updated_at END
    `;

        console.log(`\nUpdated ${updateResult} rows`);

        // Verify the update
        const verifyCustomers = await prisma.customer.findMany({
            select: {
                customer_id: true,
                customer_name: true,
                created_at: true,
                updated_at: true
            }
        });

        console.log('\n=== After Update ===');
        for (const customer of verifyCustomers) {
            console.log(`${customer.customer_id} - ${customer.customer_name}:`);
            console.log(`  created_at: ${customer.created_at}`);
            console.log(`  updated_at: ${customer.updated_at}`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fixCustomerDates();
