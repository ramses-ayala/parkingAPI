/*
  Warnings:

  - The primary key for the `Parkings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Parkings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Parkings" DROP CONSTRAINT "Parkings_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Parkings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Parkings_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Parkings_name_key" ON "Parkings"("name");
