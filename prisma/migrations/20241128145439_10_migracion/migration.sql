/*
  Warnings:

  - A unique constraint covering the columns `[fono]` on the table `personal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `personal_fono_key` ON `personal`(`fono`);
