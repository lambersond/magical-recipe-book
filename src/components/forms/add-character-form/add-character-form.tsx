import { noop } from 'lodash'
import { useForm } from 'react-hook-form'
import { AddCharacterResolver, type AddCharacterFields } from './schema'
import { Form, Input, SubmitButton } from '@/components/common'
import type { AddCharacterFormProps } from './types'

export function AddCharacterForm({
  onSubmit,
}: Readonly<AddCharacterFormProps>) {
  const { handleSubmit, register } = useForm<AddCharacterFields>({
    resolver: AddCharacterResolver,
  })

  const handleOnSubmit = (data: AddCharacterFields) => {
    onSubmit(data)
  }

  return (
    <Form title='Add Character' onSubmit={handleSubmit(handleOnSubmit)}>
      <Input
        onClick={noop}
        label='Name'
        name='name'
        data-testid='add-character-form__name'
        placeholder='Spencer Stukeley'
        register={register}
        required
      />
      <SubmitButton data-testid='add-character-form__submit' />
    </Form>
  )
}
