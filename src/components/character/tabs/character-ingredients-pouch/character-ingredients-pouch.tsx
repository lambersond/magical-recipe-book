import { CharacterIngredientsPouchProvider } from '../../providers/character-ingredients-pouch-provider'
import { IngredientsPouchHeader, IngredientsPouchIngredients } from './sections'

export function CharacterIngredientsPouch() {
  return (
    <CharacterIngredientsPouchProvider>
      <div className='max-w-7xl lg:col-span-2 space-y-6 py-6'>
        <IngredientsPouchHeader />
        <IngredientsPouchIngredients />
      </div>
    </CharacterIngredientsPouchProvider>
  )
}
