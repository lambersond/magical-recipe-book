import { noop } from 'lodash'
import { useForm } from 'react-hook-form'
import { addCharacterResolver, type AddCharacterFields } from './schema'
import { Form, Input, SubmitButton, TextArea } from '@/components/common'
import type { AddCharacterFormProps } from './types'
import type { EditableCharacter } from '@/types'

export function AddCharacterForm({
  onSubmit,
  existingCharacterNames,
}: Readonly<AddCharacterFormProps>) {
  const { formState, handleSubmit, register } = useForm<AddCharacterFields>({
    resolver: addCharacterResolver(existingCharacterNames),
  })

  const handleOnSubmit = (data: EditableCharacter) => {
    onSubmit(data)
  }

  return (
    <Form title='Add Character' onSubmit={handleSubmit(handleOnSubmit)}>
      <Input
        onClick={noop}
        label='Name'
        name='name'
        max={101}
        data-testid='add-character-form__name'
        placeholder='Spencer Stukeley'
        register={register}
        error={formState.errors.name?.message}
        required
      />
      <TextArea
        onClick={noop}
        label='Description'
        name='description'
        data-testid='add-character-form__description'
        placeholder='A brave adventurer with a knack for cooking...'
        register={register}
        rows={4}
        maxLength={1001}
        error={formState.errors.description?.message}
      />
      <SubmitButton data-testid='add-character-form__submit' />
    </Form>
  )
}
