/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `personal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `personal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personal` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `personal_password_key` ON `personal`(`password`);
