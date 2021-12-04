/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `ProductsOnOrders` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `ProductsOnOrders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductsOnOrders" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";
