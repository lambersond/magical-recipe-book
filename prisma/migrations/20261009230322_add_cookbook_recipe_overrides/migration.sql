-- CreateTable
CREATE TABLE "CookbookRecipeOverride" (
    "cookbookId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "mundaneIngredients" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CookbookRecipeOverride_pkey" PRIMARY KEY ("cookbookId","recipeId")
);

-- AddForeignKey
ALTER TABLE "CookbookRecipeOverride" ADD CONSTRAINT "CookbookRecipeOverride_cookbookId_fkey" FOREIGN KEY ("cookbookId") REFERENCES "Cookbook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookbookRecipeOverride" ADD CONSTRAINT "CookbookRecipeOverride_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

