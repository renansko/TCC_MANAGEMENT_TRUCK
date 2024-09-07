/*
  Warnings:

  - You are about to drop the column `load_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `loads` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `weight` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_load_id_fkey";

-- DropForeignKey
ALTER TABLE "loads" DROP CONSTRAINT "loads_transfer_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_load_id_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "weight" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "load_id",
ADD COLUMN     "item_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "loads";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
