/*
  Warnings:

  - Made the column `parking` on table `Parkings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parkings" ALTER COLUMN "parking" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "user" SET NOT NULL;
