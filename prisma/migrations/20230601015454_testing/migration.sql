-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(255) NULL,
    `username` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,

    UNIQUE INDEX `User_role_key`(`role`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_proker` VARCHAR(255) NULL,
    `tgl_pelaksanaan` DATE NOT NULL,
    `indikator` LONGTEXT NULL,
    `target` LONGTEXT NOT NULL,
    `total_anggaran` INTEGER NOT NULL DEFAULT 0,
    `catatan` LONGTEXT NULL,
    `status` VARCHAR(50) NOT NULL,
    `author` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
