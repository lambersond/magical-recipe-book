import { noop } from 'lodash'
import { useForm } from 'react-hook-form'
import { editCharacterResolver, type EditCharacterFields } from './schema'
import {
  Form,
  Input,
  SubmitButton,
  Switch,
  TextArea,
} from '@/components/common'
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
    const { name, description, ...abilities } = data
    onSubmit({ name, description, abilities })
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
        defaultValue={character.description}
        rows={4}
        maxLength={1001}
        error={formState.errors.description?.message}
        data-testid='edit-character-form__description'
        placeholder='A brave adventurer from the land of Illagria'
        register={register}
      />
      <div className='grid grid-cols-1 space-x-3 sm:grid-cols-2 -mt-3 mb-6'>
        <Input
          onClick={noop}
          label='Proficiency Bonus'
          type='number'
          name='proficiency'
          min={-1}
          max={11}
          defaultValue={character.abilities.proficiency}
          data-testid='edit-character-form__proficiency'
          error={formState.errors.proficiency?.message}
          register={register}
          registerOptions={{ valueAsNumber: true }}
          required
        />
        <Input
          onClick={noop}
          label='Cooking Ability'
          name='cookingAbility'
          type='number'
          min={-6}
          max={11}
          defaultValue={character.abilities.cookingAbility}
          data-testid='edit-character-form__cooking-ability'
          error={formState.errors.cookingAbility?.message}
          register={register}
          registerOptions={{ valueAsNumber: true }}
          required
        />
        <Switch
          labelSize='sm'
          label='Has Cooking Tools'
          name='hasCookingTools'
          defaultChecked={character.abilities.hasCookingTools}
          data-testid='edit-character-form__has-cooking-tools'
          register={register}
        />
      </div>
      <SubmitButton data-testid='edit-character-form__submit' />
    </Form>
  )
}
