/*
  Warnings:

  - You are about to drop the column `truck_id` on the `loads` table. All the data in the column will be lost.
  - You are about to drop the column `truck_id` on the `telemetries` table. All the data in the column will be lost.
  - You are about to drop the `trucks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `transfer_id` to the `loads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transfer_id` to the `telemetries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('AVAIABLE', 'BUSY', 'ROUTE');

-- DropForeignKey
ALTER TABLE "loads" DROP CONSTRAINT "loads_item_id_fkey";

-- DropForeignKey
ALTER TABLE "loads" DROP CONSTRAINT "loads_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "telemetries" DROP CONSTRAINT "telemetries_truck_id_fkey";

-- DropForeignKey
ALTER TABLE "trucks" DROP CONSTRAINT "trucks_company_id_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "load_id" TEXT;

-- AlterTable
ALTER TABLE "loads" DROP COLUMN "truck_id",
ADD COLUMN     "transfer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "telemetries" DROP COLUMN "truck_id",
ADD COLUMN     "transfer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birth" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL;

-- DropTable
DROP TABLE "trucks";

-- CreateTable
CREATE TABLE "transfers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" "TransferStatus" NOT NULL DEFAULT 'AVAIABLE',
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transfers_plate_key" ON "transfers"("plate");

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telemetries" ADD CONSTRAINT "telemetries_transfer_id_fkey" FOREIGN KEY ("transfer_id") REFERENCES "transfers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loads" ADD CONSTRAINT "loads_transfer_id_fkey" FOREIGN KEY ("transfer_id") REFERENCES "transfers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_load_id_fkey" FOREIGN KEY ("load_id") REFERENCES "loads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
