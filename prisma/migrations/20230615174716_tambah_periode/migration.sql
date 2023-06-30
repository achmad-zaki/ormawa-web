/*
  Warnings:

  - Added the required column `periode` to the `proker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun` to the `proker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proker` ADD COLUMN `periode` VARCHAR(50) NOT NULL,
    ADD COLUMN `tahun` YEAR NOT NULL;
