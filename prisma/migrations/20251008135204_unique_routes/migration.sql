/*
  Warnings:

  - A unique constraint covering the columns `[route]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.
  - Made the column `route` on table `Paste` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Paste" ALTER COLUMN "route" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Paste_route_key" ON "Paste"("route");
