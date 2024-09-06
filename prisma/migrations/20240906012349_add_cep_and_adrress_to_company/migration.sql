/*
  Warnings:

  - Added the required column `address` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL;
