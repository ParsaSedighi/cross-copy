/*
  Warnings:

  - You are about to drop the `Text` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Text" DROP CONSTRAINT "Text_userId_fkey";

-- DropTable
DROP TABLE "public"."Text";

-- CreateTable
CREATE TABLE "public"."Paste" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Paste_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Paste" ADD CONSTRAINT "Paste_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
