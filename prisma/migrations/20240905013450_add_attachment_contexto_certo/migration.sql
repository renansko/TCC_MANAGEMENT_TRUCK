/*
  Warnings:

  - You are about to drop the column `transfer_id` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `attachments` table. All the data in the column will be lost.
  - Added the required column `attachment_id` to the `transfers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachment_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_transfer_id_fkey";

-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_user_id_fkey";

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "transfer_id",
DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "transfers" ADD COLUMN     "attachment_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "attachment_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_attachment_id_fkey" FOREIGN KEY ("attachment_id") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_attachment_id_fkey" FOREIGN KEY ("attachment_id") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
