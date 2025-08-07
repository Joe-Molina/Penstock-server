/*
  Warnings:

  - You are about to drop the column `amount` on the `Order_Detail` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seller` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salesperson_assignment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `actual_price` to the `Order_Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cant` to the `Order_Detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `Seller` DROP FOREIGN KEY `Seller_userId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `salesperson_assignment` DROP FOREIGN KEY `salesperson_assignment_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `salesperson_assignment` DROP FOREIGN KEY `salesperson_assignment_sellerId_fkey`;

-- DropIndex
DROP INDEX `Order_clientId_fkey` ON `Order`;

-- DropIndex
DROP INDEX `User_companyId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `Company` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Order_Detail` DROP COLUMN `amount`,
    ADD COLUMN `actual_price` DOUBLE NOT NULL,
    ADD COLUMN `cant` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `companyId`,
    DROP COLUMN `role`,
    DROP COLUMN `status`,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Client`;

-- DropTable
DROP TABLE `Seller`;

-- DropTable
DROP TABLE `salesperson_assignment`;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
