/*
  Warnings:

  - You are about to drop the column `attachment_id` on the `transfers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transfers" DROP CONSTRAINT "transfers_attachment_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_attachment_id_fkey";

-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "transfer_id" TEXT,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "transfers" DROP COLUMN "attachment_id";

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_transfer_id_fkey" FOREIGN KEY ("transfer_id") REFERENCES "transfers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
