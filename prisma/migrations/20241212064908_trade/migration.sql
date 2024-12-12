/*
  Warnings:

  - You are about to drop the `Trade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Trade";

-- CreateTable
CREATE TABLE "TradeStock" (
    "id" SERIAL NOT NULL,
    "goatName" TEXT NOT NULL,
    "purchaserInformation" TEXT NOT NULL,
    "customerDetails" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "exitDate" TIMESTAMP(3),
    "salesStatus" TEXT NOT NULL,
    "maintenanceRecords" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "uniqueIdentificationNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeStock_uniqueIdentificationNumber_key" ON "TradeStock"("uniqueIdentificationNumber");
