/*
  Warnings:

  - You are about to drop the column `adress` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dayOfWeek,restaurantId]` on the table `OpeningHour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OpeningHour_dayOfWeek_restaurantId_key" ON "OpeningHour"("dayOfWeek", "restaurantId");
