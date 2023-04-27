-- CreateTable
CREATE TABLE "Phosne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Phosne_number_key" ON "Phosne"("number");
