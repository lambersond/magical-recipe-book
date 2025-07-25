/*
  Warnings:

  - You are about to drop the column `accountId` on the `Character` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_accountId_fkey";

-- DropIndex
DROP INDEX "Character_accountId_name_key";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "accountId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "image" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "image" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "image" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "Cookbook" (
    "id" TEXT NOT NULL,
    "image" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Cookbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsPouch" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "characterId" TEXT NOT NULL,
    "commonIngredients" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "IngredientsPouch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForagedIngredient" (
    "id" TEXT NOT NULL,
    "foundOnDay" INTEGER NOT NULL,
    "commonIngredients" INTEGER NOT NULL DEFAULT 0,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "characterId" TEXT NOT NULL,
    "magicalIngredientId" TEXT,
    "pouchId" TEXT,

    CONSTRAINT "ForagedIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Backpack" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Backpack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CookedDish" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cookedOnDay" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recipeId" TEXT NOT NULL,
    "backpackId" TEXT,

    CONSTRAINT "CookedDish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfusedItem" (
    "id" TEXT NOT NULL,
    "infusedOnDay" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "backpackId" TEXT,

    CONSTRAINT "InfusedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CookbookToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CookbookToRecipe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cookbook_characterId_key" ON "Cookbook"("characterId");

-- CreateIndex
CREATE INDEX "Cookbook_characterId_idx" ON "Cookbook"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientsPouch_characterId_key" ON "IngredientsPouch"("characterId");

-- CreateIndex
CREATE INDEX "IngredientsPouch_characterId_idx" ON "IngredientsPouch"("characterId");

-- CreateIndex
CREATE INDEX "ForagedIngredient_characterId_idx" ON "ForagedIngredient"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Backpack_characterId_key" ON "Backpack"("characterId");

-- CreateIndex
CREATE INDEX "Backpack_characterId_idx" ON "Backpack"("characterId");

-- CreateIndex
CREATE INDEX "CookedDish_backpackId_idx" ON "CookedDish"("backpackId");

-- CreateIndex
CREATE INDEX "InfusedItem_backpackId_idx" ON "InfusedItem"("backpackId");

-- CreateIndex
CREATE INDEX "_CookbookToRecipe_B_index" ON "_CookbookToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Character_userId_name_key" ON "Character"("userId", "name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cookbook" ADD CONSTRAINT "Cookbook_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsPouch" ADD CONSTRAINT "IngredientsPouch_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForagedIngredient" ADD CONSTRAINT "ForagedIngredient_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForagedIngredient" ADD CONSTRAINT "ForagedIngredient_magicalIngredientId_fkey" FOREIGN KEY ("magicalIngredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForagedIngredient" ADD CONSTRAINT "ForagedIngredient_pouchId_fkey" FOREIGN KEY ("pouchId") REFERENCES "IngredientsPouch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Backpack" ADD CONSTRAINT "Backpack_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookedDish" ADD CONSTRAINT "CookedDish_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookedDish" ADD CONSTRAINT "CookedDish_backpackId_fkey" FOREIGN KEY ("backpackId") REFERENCES "Backpack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfusedItem" ADD CONSTRAINT "InfusedItem_backpackId_fkey" FOREIGN KEY ("backpackId") REFERENCES "Backpack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CookbookToRecipe" ADD CONSTRAINT "_CookbookToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Cookbook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CookbookToRecipe" ADD CONSTRAINT "_CookbookToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
