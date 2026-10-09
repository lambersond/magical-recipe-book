export type EditCommonIngredientsFormProps = {
  mundaneIngredients: string[]
  defaultMundaneIngredients: string[]
  onSubmit(mundaneIngredients: string[]): Promise<void> | void
}
