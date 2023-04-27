/*
  Warnings:

  - You are about to drop the `Phosne` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Phosne";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Phone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Phone_number_key" ON "Phone"("number");
