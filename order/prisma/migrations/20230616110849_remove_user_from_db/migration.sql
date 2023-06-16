/*
  Warnings:

  - You are about to drop the column `product_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_name` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropIndex
DROP INDEX "orders_order_id_key";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "product_id",
ADD COLUMN     "product_name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "order_id";

-- DropTable
DROP TABLE "users";
