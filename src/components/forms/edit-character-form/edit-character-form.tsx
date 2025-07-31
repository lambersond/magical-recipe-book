import { noop } from 'lodash'
import { useForm } from 'react-hook-form'
import { editCharacterResolver, type EditCharacterFields } from './schema'
import { Form, Input, SubmitButton, TextArea } from '@/components/common'
import type { EditCharacterFormProps } from './types'

export function EditCharacterForm({
  character,
  onSubmit,
  existingCharacterNames,
}: Readonly<EditCharacterFormProps>) {
  const { formState, handleSubmit, register } = useForm<EditCharacterFields>({
    resolver: editCharacterResolver(existingCharacterNames),
  })

  const handleOnSubmit = (data: EditCharacterFields) => {
    onSubmit({ ...data })
  }

  return (
    <Form title='Edit Character' onSubmit={handleSubmit(handleOnSubmit)}>
      <Input
        onClick={noop}
        label='Name'
        name='name'
        max={101}
        defaultValue={character.name}
        data-testid='edit-character-form__name'
        placeholder='Hello World App'
        error={formState.errors.name?.message}
        register={register}
        required
      />
      <TextArea
        onClick={noop}
        label='Description'
        name='description'
        className='mb-6'
        defaultValue={character.description}
        rows={4}
        maxLength={1001}
        error={formState.errors.description?.message}
        data-testid='edit-character-form__description'
        placeholder='A brave adventurer from the land of Illagria'
        register={register}
      />
      <SubmitButton data-testid='edit-character-form__submit' />
    </Form>
  )
}
