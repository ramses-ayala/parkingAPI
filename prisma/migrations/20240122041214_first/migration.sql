-- CreateEnum
CREATE TYPE "parkingTypes" AS ENUM ('public', 'private', 'courtesy');

-- CreateEnum
CREATE TYPE "userTypes" AS ENUM ('corporate', 'provider', 'visitor');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user" "userTypes" DEFAULT 'provider',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parkings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "spots" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,
    "parking" "parkingTypes" DEFAULT 'public',

    CONSTRAINT "Parkings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
