-- CreateTable
CREATE TABLE `cargo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `fono` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cargo_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
