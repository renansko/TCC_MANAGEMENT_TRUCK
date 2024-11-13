/*
  Warnings:

  - You are about to drop the column `load_id` on the `items` table. All the data in the column will be lost.
  - Added the required column `transfer_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "load_id";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "transfer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_transfer_id_fkey" FOREIGN KEY ("transfer_id") REFERENCES "transfers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
