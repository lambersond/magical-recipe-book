import type { DropdownOption } from '@/components/common'
import type { LearnRecipe } from '@/types'

export type AddCookbookRecipeFormProps = {
  onSubmit(recipe: LearnRecipe): void
  options: DropdownOption[]
}
