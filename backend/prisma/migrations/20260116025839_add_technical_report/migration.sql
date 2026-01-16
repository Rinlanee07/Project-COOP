-- CreateTable
CREATE TABLE "TechnicalReport" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "created_by" VARCHAR(10) NOT NULL,

    CONSTRAINT "TechnicalReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TechnicalReport" ADD CONSTRAINT "TechnicalReport_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
