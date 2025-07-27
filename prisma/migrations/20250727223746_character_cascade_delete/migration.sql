-- DropForeignKey
ALTER TABLE "Backpack" DROP CONSTRAINT "Backpack_characterId_fkey";

-- DropForeignKey
ALTER TABLE "Cookbook" DROP CONSTRAINT "Cookbook_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CookedDish" DROP CONSTRAINT "CookedDish_backpackId_fkey";

-- DropForeignKey
ALTER TABLE "ForagedIngredient" DROP CONSTRAINT "ForagedIngredient_characterId_fkey";

-- DropForeignKey
ALTER TABLE "ForagedIngredient" DROP CONSTRAINT "ForagedIngredient_pouchId_fkey";

-- DropForeignKey
ALTER TABLE "InfusedItem" DROP CONSTRAINT "InfusedItem_backpackId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsPouch" DROP CONSTRAINT "IngredientsPouch_characterId_fkey";

-- AddForeignKey
ALTER TABLE "Cookbook" ADD CONSTRAINT "Cookbook_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsPouch" ADD CONSTRAINT "IngredientsPouch_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForagedIngredient" ADD CONSTRAINT "ForagedIngredient_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForagedIngredient" ADD CONSTRAINT "ForagedIngredient_pouchId_fkey" FOREIGN KEY ("pouchId") REFERENCES "IngredientsPouch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Backpack" ADD CONSTRAINT "Backpack_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookedDish" ADD CONSTRAINT "CookedDish_backpackId_fkey" FOREIGN KEY ("backpackId") REFERENCES "Backpack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfusedItem" ADD CONSTRAINT "InfusedItem_backpackId_fkey" FOREIGN KEY ("backpackId") REFERENCES "Backpack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
