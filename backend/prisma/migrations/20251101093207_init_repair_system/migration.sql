/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the `CloseRepair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RepairDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RepairImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RepairPart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RepairRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shipping` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact_person` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CloseRepair" DROP CONSTRAINT "CloseRepair_repairRequestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RepairDetail" DROP CONSTRAINT "RepairDetail_repairRequestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RepairDetail" DROP CONSTRAINT "RepairDetail_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RepairImage" DROP CONSTRAINT "RepairImage_repairRequestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RepairPart" DROP CONSTRAINT "RepairPart_detailId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RepairRequest" DROP CONSTRAINT "RepairRequest_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RepairRequest" DROP CONSTRAINT "RepairRequest_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Shipping" DROP CONSTRAINT "Shipping_repairRequestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_organizationId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "updatedAt",
ADD COLUMN     "company_address" TEXT,
ADD COLUMN     "company_name" VARCHAR(100),
ADD COLUMN     "contact_email" VARCHAR(100),
ADD COLUMN     "contact_line_id" VARCHAR(50),
ADD COLUMN     "contact_person" VARCHAR(100) NOT NULL,
ADD COLUMN     "contact_tel" VARCHAR(20),
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" VARCHAR(10) NOT NULL,
ADD COLUMN     "customer_id" VARCHAR(10) NOT NULL,
ADD COLUMN     "customer_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone_number" VARCHAR(20) NOT NULL,
ADD COLUMN     "shop_address" TEXT,
ADD COLUMN     "shop_name" VARCHAR(100),
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "organizationId",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "role",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "user_id" VARCHAR(10) NOT NULL,
ADD COLUMN     "user_role" VARCHAR(20) NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "username" VARCHAR(50) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "public"."CloseRepair";

-- DropTable
DROP TABLE "public"."Organization";

-- DropTable
DROP TABLE "public"."RepairDetail";

-- DropTable
DROP TABLE "public"."RepairImage";

-- DropTable
DROP TABLE "public"."RepairPart";

-- DropTable
DROP TABLE "public"."RepairRequest";

-- DropTable
DROP TABLE "public"."Shipping";

-- DropEnum
DROP TYPE "public"."RepairStatus";

-- DropEnum
DROP TYPE "public"."Role";

-- CreateTable
CREATE TABLE "Setting" (
    "setting_id" BIGSERIAL NOT NULL,
    "setting_key" VARCHAR(50) NOT NULL,
    "setting_value" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "updated_by" VARCHAR(10) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("setting_id")
);

-- CreateTable
CREATE TABLE "Device" (
    "device_id" VARCHAR(10) NOT NULL,
    "device_name" VARCHAR(100) NOT NULL,
    "device_type" VARCHAR(50) NOT NULL,
    "serial_number" VARCHAR(100),
    "installation_location" VARCHAR(100),
    "warranty_end_date" DATE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("device_id")
);

-- CreateTable
CREATE TABLE "Cust_Device" (
    "cust_device_id" BIGSERIAL NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" VARCHAR(10) NOT NULL,
    "device_id" VARCHAR(10) NOT NULL,
    "created_by" VARCHAR(10) NOT NULL,

    CONSTRAINT "Cust_Device_pkey" PRIMARY KEY ("cust_device_id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticket_id" VARCHAR(15) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "priority" VARCHAR(20) NOT NULL DEFAULT 'Medium',
    "status" VARCHAR(20) NOT NULL DEFAULT 'New',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "customer_id" VARCHAR(10) NOT NULL,
    "device_id" VARCHAR(10),
    "reporter_id" TEXT,
    "assigned_to" TEXT,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateTable
CREATE TABLE "Ticket_Update" (
    "update_id" BIGSERIAL NOT NULL,
    "update_type" VARCHAR(20) NOT NULL,
    "update_detail" TEXT,
    "new_status" VARCHAR(20),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_id" VARCHAR(15) NOT NULL,
    "updated_by" VARCHAR(10) NOT NULL,

    CONSTRAINT "Ticket_Update_pkey" PRIMARY KEY ("update_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting_setting_key_key" ON "Setting"("setting_key");

-- CreateIndex
CREATE UNIQUE INDEX "Device_serial_number_key" ON "Device"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cust_Device" ADD CONSTRAINT "Cust_Device_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cust_Device" ADD CONSTRAINT "Cust_Device_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("device_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cust_Device" ADD CONSTRAINT "Cust_Device_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("device_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_Update" ADD CONSTRAINT "Ticket_Update_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket_Update" ADD CONSTRAINT "Ticket_Update_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
