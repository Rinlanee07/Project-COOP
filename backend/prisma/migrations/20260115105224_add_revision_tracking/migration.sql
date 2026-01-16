/*
  Warnings:

  - A unique constraint covering the columns `[ticket_running_no]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "revision_date" DATE,
ADD COLUMN     "revision_number" INTEGER,
ADD COLUMN     "ticket_running_no" VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticket_running_no_key" ON "Ticket"("ticket_running_no");
