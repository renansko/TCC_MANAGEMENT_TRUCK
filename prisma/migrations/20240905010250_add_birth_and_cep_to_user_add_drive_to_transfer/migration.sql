/*
  Warnings:

  - Added the required column `driver_id` to the `transfers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transfers" ADD COLUMN     "driver_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
