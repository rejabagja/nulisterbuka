-- AlterTable
ALTER TABLE "public"."posts" ADD COLUMN     "liked_by" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
