import { useCharacter } from '@/components/character/hooks/use-character'
import { Card } from '@/components/common'

export function QuickStats() {
  const character = useCharacter()

  const commonIngredientsCount =
    character.ingredientsPouch.commonIngredients || 0
  const magicalIngredientsCount =
    character.ingredientsPouch.magicalIngredients.length || 0
  const recipesKnownCount = character.cookbook?.recipes?.length || 0

  return (
    <Card className='lg:col-span-2 space-y-6 border border-border'>
      <h2 className='text-xl font-semibold mb-4 text-white'>Quick Stats</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card className='bg-stat-common-ingredients/20 border-2 border-stat-common-ingredients p-4 flex flex-col items-center justify-center gap-2'>
          <p className='text-lg'>Common Ingredients</p>
          <p className='text-3xl font-bold'>{commonIngredientsCount}</p>
        </Card>
        <Card className='bg-stat-magic-ingredients/20 border-2 border-stat-magic-ingredients p-4 flex flex-col items-center justify-center gap-2'>
          <p className='text-lg'>Magical Ingredients</p>
          <p className='text-3xl font-bold'>{magicalIngredientsCount}</p>
        </Card>
        <Card className='bg-stat-recipes/20 border-2 border-stat-recipes p-4 flex flex-col items-center justify-center gap-2'>
          <p className='text-lg'>Recipes Known</p>
          <p className='text-3xl font-bold'>{recipesKnownCount}</p>
        </Card>
      </div>
    </Card>
  )
}
