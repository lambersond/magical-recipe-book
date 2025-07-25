import * as repository from './repository'
import type { Recipe } from '@/types'

export async function getAllRecipes() {
  const data = await repository.getRecipes({
    include: {
      magicalIngredients: {
        include: {
          ingredient: {
            select: {
              name: true,
              rarity: true,
              bane: true,
              boon: true,
            },
          },
        },
      },
    },
  })

  return data.map((recipe: Recipe) => ({
    ...recipe,
    magicalIngredients:
      recipe?.magicalIngredients?.map((i: any) => i.ingredient) ?? [],
  }))
}
