/*
  Warnings:

  - You are about to drop the `cargo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `cargo`;

-- CreateTable
CREATE TABLE `personal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `fono` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `personal_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
