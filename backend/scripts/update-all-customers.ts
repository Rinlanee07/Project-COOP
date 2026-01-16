import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateAllCustomers() {
    try {
        // Update ALL customers, setting NOW() for created_at and updated_at
        const customers = await prisma.customer.findMany();

        console.log(`Updating ${customers.length} customers...`);

        for (const customer of customers) {
            await prisma.customer.update({
                where: { customer_id: customer.customer_id },
                data: {
                    created_at: customer.created_at || new Date(),
                    updated_at: new Date(),
                }
            });
            console.log(`Updated: ${customer.customer_id} - ${customer.customer_name}`);
        }

        console.log('\n✅ All customers updated successfully!');

        // Show updated data
        const updatedCustomers = await prisma.customer.findMany({
            select: {
                customer_id: true,
                customer_name: true,
                created_at: true,
                updated_at: true
            }
        });

        console.log('\n=== Updated Customer Dates ===');
        updatedCustomers.forEach(c => {
            console.log(`${c.customer_id}: created=${c.created_at}, updated=${c.updated_at}`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateAllCustomers();
