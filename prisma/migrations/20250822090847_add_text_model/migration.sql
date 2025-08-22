-- CreateTable
CREATE TABLE "public"."Text" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Text" ADD CONSTRAINT "Text_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
