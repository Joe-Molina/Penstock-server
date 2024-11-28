/*
  Warnings:

  - You are about to drop the column `apellidos` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `direccion` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `nombres` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `representante` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `apellidos` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `nombres` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `direct` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "store" TEXT NOT NULL,
    "direct" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("id", "userId") SELECT "id", "userId" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Seller" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastname" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seller" ("id", "userId") SELECT "id", "userId" FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
