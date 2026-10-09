import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, Input, SubmitButton } from '@/components/common'
import {
  COMMON_INGREDIENT_NAME_MAX_LENGTH,
  type CommonIngredientsFields,
  commonIngredientsSchema,
} from '@/schemas/common-ingredients'
import { secondaryButton } from '@/utils/styles'
import type { EditCommonIngredientsFormProps } from './types'

export function EditCommonIngredientsForm({
  mundaneIngredients,
  defaultMundaneIngredients,
  onSubmit,
}: Readonly<EditCommonIngredientsFormProps>) {
  const { formState, handleSubmit, register, reset } =
    useForm<CommonIngredientsFields>({
      resolver: zodResolver(commonIngredientsSchema),
      defaultValues: { mundaneIngredients },
    })

  const handleOnSubmit = (data: CommonIngredientsFields) =>
    onSubmit(data.mundaneIngredients)

  return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      {defaultMundaneIngredients.map((original, index) => (
        <Input
          key={index}
          label={`Ingredient ${index + 1}`}
          name={`mundaneIngredients.${index}`}
          placeholder={original}
          maxLength={COMMON_INGREDIENT_NAME_MAX_LENGTH}
          error={formState.errors.mundaneIngredients?.[index]?.message}
          data-testid={`edit-common-ingredients-form__ingredient-${index}`}
          register={register}
        />
      ))}
      <div className='flex gap-4 mt-2'>
        <button
          type='button'
          className={secondaryButton}
          onClick={() =>
            reset({ mundaneIngredients: defaultMundaneIngredients })
          }
        >
          Reset to original
        </button>
        <SubmitButton disabled={formState.isSubmitting}>Save</SubmitButton>
      </div>
    </Form>
  )
}
