-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
