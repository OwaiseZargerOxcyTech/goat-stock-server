-- CreateTable
CREATE TABLE "MaleStock" (
    "id" SERIAL NOT NULL,
    "goatName" TEXT NOT NULL,
    "purchaserInformation" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "exitDate" TIMESTAMP(3),
    "salesStatus" TEXT NOT NULL,
    "maintenanceRecords" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "uniqueIdentificationNumber" TEXT NOT NULL,
    "photographUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaleStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FemaleStock" (
    "id" SERIAL NOT NULL,
    "goatName" TEXT NOT NULL,
    "purchaserInformation" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "exitDate" TIMESTAMP(3),
    "salesStatus" TEXT NOT NULL,
    "maintenanceRecords" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "uniqueIdentificationNumber" TEXT NOT NULL,
    "photographUrl" TEXT,
    "mateDate" TIMESTAMP(3),
    "pregnancyStatus" TEXT,
    "matingPartnerInformation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FemaleStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" SERIAL NOT NULL,
    "goatName" TEXT NOT NULL,
    "intendedUse" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "transactionDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaleStock_uniqueIdentificationNumber_key" ON "MaleStock"("uniqueIdentificationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "FemaleStock_uniqueIdentificationNumber_key" ON "FemaleStock"("uniqueIdentificationNumber");
