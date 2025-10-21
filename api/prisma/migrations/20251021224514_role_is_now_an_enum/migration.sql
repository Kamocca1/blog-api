/*
  Warnings:

  - You are about to drop the column `role_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AUTHOR', 'ADMIN');

-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_role_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role_id",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'AUTHOR';

-- DropTable
DROP TABLE "public"."role";
