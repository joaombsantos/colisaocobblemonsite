-- CreateEnum
CREATE TYPE "ServerType" AS ENUM ('KANTO', 'KANTO_PLUS', 'SURVIVAL');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('VIPS', 'CAIXAS', 'PASSES');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "server" "ServerType" NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "description" TEXT,
    "descriptionImage" TEXT NOT NULL,
    "command" TEXT,
    "requireOnline" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryQueue" (
    "id" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "server" "ServerType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeliveryQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_nick_key" ON "Cart"("nick");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
