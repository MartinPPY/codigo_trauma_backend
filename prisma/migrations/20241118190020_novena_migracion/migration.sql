/*
  Warnings:

  - You are about to drop the column `disponibilidad` on the `atencion` table. All the data in the column will be lost.
  - Added the required column `disponibilidad` to the `personal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `atencion` DROP COLUMN `disponibilidad`;

-- AlterTable
ALTER TABLE `personal` ADD COLUMN `disponibilidad` VARCHAR(191) NOT NULL;
