/*
  Warnings:

  - Added the required column `scheduledFor` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('DELIVERY', 'PICK_UP');

-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('WAITING_FOR_PAYMENT', 'PREPARING', 'READY');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "scheduledFor" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "state" "OrderState" NOT NULL,
ADD COLUMN     "type" "OrderType" NOT NULL;
