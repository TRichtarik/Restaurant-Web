/*
  Warnings:

  - Changed the type of `type` on the `MenuItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MenuItemType" AS ENUM ('SOUP', 'MAIN_COURSE', 'DESSERT', 'ALCOHOLIC_BEVERAGE', 'NON_ALCOHOLIC_BEVERAGE');

-- AlterEnum
ALTER TYPE "OrderState" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "type",
ADD COLUMN     "type" "MenuItemType" NOT NULL;
