import { noop } from 'lodash'
import { useForm } from 'react-hook-form'
import { EditCharacterResolver, type EditCharacterFields } from './schema'
import { Form, Input, SubmitButton, TextArea } from '@/components/common'
import type { EditCharacterFormProps } from './types'

export function EditCharacterForm({
  character,
  onSubmit,
}: Readonly<EditCharacterFormProps>) {
  const { handleSubmit, register } = useForm<EditCharacterFields>({
    resolver: EditCharacterResolver,
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
        defaultValue={character.name}
        data-testid='edit-character-form__name'
        placeholder='Hello World App'
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
        data-testid='edit-character-form__description'
        placeholder='A brave adventurer from the land of Illagria'
        register={register}
      />
      <SubmitButton data-testid='edit-character-form__submit' />
    </Form>
  )
}
