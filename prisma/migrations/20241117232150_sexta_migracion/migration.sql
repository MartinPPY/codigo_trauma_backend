/*
  Warnings:

  - You are about to alter the column `victimas` on the `atencion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `atencion` MODIFY `victimas` INTEGER NOT NULL;
