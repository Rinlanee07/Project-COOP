-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "tax_id" VARCHAR(20);

-- AlterTable
ALTER TABLE "DeviceType" ADD COLUMN     "common_issues" TEXT;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "accessories" TEXT,
ADD COLUMN     "engineer_comment" TEXT,
ADD COLUMN     "is_chargeable" BOOLEAN DEFAULT false,
ADD COLUMN     "purchase_date" DATE,
ADD COLUMN     "qc_by" VARCHAR(10),
ADD COLUMN     "qc_date" TIMESTAMPTZ,
ADD COLUMN     "qc_note" TEXT,
ADD COLUMN     "qc_passed" BOOLEAN DEFAULT false,
ADD COLUMN     "received_by" VARCHAR(100),
ADD COLUMN     "remark" TEXT,
ADD COLUMN     "sent_by" VARCHAR(100);

-- CreateTable
CREATE TABLE "TicketPart" (
    "part_id" BIGSERIAL NOT NULL,
    "part_number" VARCHAR(50),
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "ticket_id" VARCHAR(15) NOT NULL,

    CONSTRAINT "TicketPart_pkey" PRIMARY KEY ("part_id")
);

-- CreateTable
CREATE TABLE "RepairLog" (
    "log_id" BIGSERIAL NOT NULL,
    "action_taken" TEXT NOT NULL,
    "parts_used" TEXT,
    "cost" DECIMAL(10,2),
    "repair_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_id" VARCHAR(15) NOT NULL,
    "technician_id" VARCHAR(10) NOT NULL,

    CONSTRAINT "RepairLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "attachment_id" TEXT NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_type" VARCHAR(50) NOT NULL,
    "uploaded_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_id" VARCHAR(15),
    "uploaded_by" VARCHAR(10) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("attachment_id")
);

-- CreateTable
CREATE TABLE "BorrowTransaction" (
    "transaction_id" TEXT NOT NULL,
    "borrow_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" DATE NOT NULL,
    "return_date" TIMESTAMPTZ,
    "status" VARCHAR(20) NOT NULL DEFAULT 'BORROWED',
    "deposit_amount" DECIMAL(10,2),
    "notes" TEXT,
    "device_id" VARCHAR(10) NOT NULL,
    "borrower_name" VARCHAR(100) NOT NULL,
    "contact_info" VARCHAR(100),
    "handled_by" VARCHAR(10) NOT NULL,

    CONSTRAINT "BorrowTransaction_pkey" PRIMARY KEY ("transaction_id")
);

-- AddForeignKey
ALTER TABLE "TicketPart" ADD CONSTRAINT "TicketPart_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepairLog" ADD CONSTRAINT "RepairLog_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepairLog" ADD CONSTRAINT "RepairLog_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowTransaction" ADD CONSTRAINT "BorrowTransaction_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("device_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowTransaction" ADD CONSTRAINT "BorrowTransaction_handled_by_fkey" FOREIGN KEY ("handled_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
