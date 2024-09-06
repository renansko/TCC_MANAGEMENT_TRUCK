-- DropForeignKey
ALTER TABLE "transfers" DROP CONSTRAINT "transfers_driver_id_fkey";

-- AlterTable
ALTER TABLE "transfers" ALTER COLUMN "driver_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
