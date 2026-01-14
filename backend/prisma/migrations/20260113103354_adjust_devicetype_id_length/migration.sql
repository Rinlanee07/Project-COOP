/*
  Warnings:

  - The primary key for the `DeviceType` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Device" DROP CONSTRAINT "Device_device_type_id_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "device_type_id" SET DATA TYPE VARCHAR(25);

-- AlterTable
ALTER TABLE "DeviceType" DROP CONSTRAINT "DeviceType_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(25),
ADD CONSTRAINT "DeviceType_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_device_type_id_fkey" FOREIGN KEY ("device_type_id") REFERENCES "DeviceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
