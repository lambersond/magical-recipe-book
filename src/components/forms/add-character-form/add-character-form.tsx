import { noop } from 'lodash'
import { useForm } from 'react-hook-form'
import { AddCharacterResolver, type AddCharacterFields } from './schema'
import { Form, Input, SubmitButton, TextArea } from '@/components/common'
import type { AddCharacterFormProps } from './types'
import type { EditableCharacter } from '@/types'

export function AddCharacterForm({
  onSubmit,
}: Readonly<AddCharacterFormProps>) {
  const { handleSubmit, register } = useForm<AddCharacterFields>({
    resolver: AddCharacterResolver,
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
        data-testid='add-character-form__name'
        placeholder='Spencer Stukeley'
        register={register}
        required
      />
      <TextArea
        onClick={noop}
        label='Description'
        name='description'
        data-testid='add-character-form__description'
        placeholder='A brave adventurer with a knack for cooking...'
        register={register}
        rows={3}
        maxLength={500}
        className='mb-4'
      />
      <SubmitButton data-testid='add-character-form__submit' />
    </Form>
  )
}
