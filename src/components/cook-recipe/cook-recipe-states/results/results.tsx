import { ContinueAdventuringButton } from '../../buttons'
import {
  useCookingRecipe,
  useCookingResults,
} from '../../hooks/use-cook-recipe'
import { getCookingResult, getStyles } from './utils'
import { RecipeOutcome } from '@/components/recipe-outcome'

export function Results() {
  const recipe = useCookingRecipe()
  const cookingResults = useCookingResults()

  const finalResults = getCookingResult(cookingResults, recipe.difficulty)
  const styles = getStyles(finalResults.type)

  return (
    <span className='flex flex-col items-center justify-center gap-4 pt-4'>
      <span className='text-7xl py-6'>{finalResults.emoji}</span>
      <p className={styles.titleClasses}>{finalResults.text}</p>
      <span className='bg-paper-light p-4 text-text-primary/60 rounded-lg text-center'>
        {recipe[finalResults.flavorText]}
      </span>
      {!!finalResults.unlocksMagicModifiers && (
        <span className='w-full mb-6'>
          <RecipeOutcome
            type={finalResults.type}
            ingredients={recipe.magicalIngredients}
          />
        </span>
      )}
      <ContinueAdventuringButton />
    </span>
  )
}
