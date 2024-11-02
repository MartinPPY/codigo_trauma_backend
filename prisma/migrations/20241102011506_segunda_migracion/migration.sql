/*
  Warnings:

  - Added the required column `apellido` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargo` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "apellido" TEXT NOT NULL,
ADD COLUMN     "cargo" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;
