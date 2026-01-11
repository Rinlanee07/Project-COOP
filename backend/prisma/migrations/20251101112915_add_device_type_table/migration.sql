/*
  Warnings:

  - You are about to drop the column `device_name` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `device_type` on the `Device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "device_name",
DROP COLUMN "device_type",
ADD COLUMN     "device_type_id" VARCHAR(10);

-- CreateTable
CREATE TABLE "DeviceType" (
    "id" VARCHAR(10) NOT NULL,
    "device_type" VARCHAR(50) NOT NULL,
    "brand" VARCHAR(50) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "DeviceType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceType_device_type_brand_model_key" ON "DeviceType"("device_type", "brand", "model");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_device_type_id_fkey" FOREIGN KEY ("device_type_id") REFERENCES "DeviceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
