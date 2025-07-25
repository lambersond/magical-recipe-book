import { MagicalForagingEntryCard } from '@/components/cards'
import { useCharacter } from '@/components/character/hooks/use-character'
import { useCharacterIngredientsPouch } from '@/components/character/hooks/use-character-ingredients-pouch'
import { Card } from '@/components/common'

export function IngredientsPouchIngredients() {
  const character = useCharacter()
  const { filter } = useCharacterIngredientsPouch()
  const { ingredientsPouch } = character

  const counts = [
    {
      key: 'c',
      count: ingredientsPouch.commonIngredients,
      image: '🌿',
      classes:
        'text-xl font-bold text-text-primary sm:after:ml-2 after:text-text-secondary after:text-sm after:content-[""] md:after:content-["Common"] lg:after:content-["Common_Ingredients"]',
    },
    {
      key: 'm',
      count: ingredientsPouch.magicalIngredients.length,
      image: '✨',
      classes:
        'text-xl font-bold text-text-primary sm:after:ml-2 after:text-text-secondary after:text-sm after:content-[""] md:after:content-["Magical"] lg:after:content-["Magical_Ingredients"]',
    },
  ]

  return (
    <Card>
      <div className='mb-6 pb-4 border-b border-border'>
        <div className='flex items-center justify-between '>
          <h3 className='text-lg font-semibold text-white'>Ingredients</h3>
          <div className='flex items-center space-x-4 md:space-x-6 lg:space-x-8'>
            {counts.map(({ key, count, classes, image }) => (
              <div key={key} className='flex items-center'>
                <p className='size-7 scale-150 flex items-center justify-center'>
                  {image}
                </p>
                <div className='flex items-baseline gap-2'>
                  <span className={classes}>{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Magical Ingredients Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {ingredientsPouch.magicalIngredients
          .filter(ingredient => filter(ingredient))
          .map(ingredient => (
            <MagicalForagingEntryCard
              key={ingredient.id}
              day={ingredient.foundOnDay}
              found={ingredient.magicalIngredient?.name}
              rarity={ingredient.magicalIngredient?.rarity}
              isExpired={ingredient.isExpired}
              isUsed={ingredient.isUsed}
            />
          ))}
      </div>
    </Card>
  )
}
