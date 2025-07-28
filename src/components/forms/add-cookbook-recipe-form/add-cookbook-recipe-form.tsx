import { Controller, useForm } from 'react-hook-form'
import {
  type AddCookbookRecipeFields,
  AddCookbookRecipeResolver,
} from './schema'
import { Dropdown, Form, SubmitButton } from '@/components/common'
import type { AddCookbookRecipeFormProps } from './types'
import type { LearnRecipe } from '@/types'

export function AddCookbookRecipeForm({
  onSubmit,
  options,
}: Readonly<AddCookbookRecipeFormProps>) {
  const { control, handleSubmit } = useForm<AddCookbookRecipeFields>({
    resolver: AddCookbookRecipeResolver,
  })

  const handleOnSubmit = (data: LearnRecipe) => {
    onSubmit(data)
  }

  return (
    <Form title='Add Recipe' onSubmit={handleSubmit(handleOnSubmit)}>
      <Controller
        name='recipeId'
        control={control}
        render={({ field }) => (
          <Dropdown
            label='Recipes'
            name='add-cookbook-recipe-form__recipe'
            data-testid='add-ookbook-recipe-form__recipe'
            options={options}
            defaultEmpty
            required
            searchPlaceholder='Search Recipes...'
            placeholder='Select Recipe...'
            searchable
            width='min-w-2xs w-full'
            onSelect={selected => {
              field.onChange(selected.value)
            }}
          />
        )}
      />
      <SubmitButton
        data-testid='add-character-form__submit'
        className='mt-4 w-full bg-primary/70 hover:bg-primary rounded-lg text-xl text-tertiary uppercase font-bold  py-3 cursor-pointer'
      >
        Learn Recipe
      </SubmitButton>
    </Form>
  )
}
