import { noop } from 'lodash'
import { useForm } from 'react-hook-form'
import { addCharacterResolver, type AddCharacterFields } from './schema'
import {
  Form,
  Input,
  SubmitButton,
  Switch,
  TextArea,
} from '@/components/common'
import type { AddCharacterFormProps } from './types'

export function AddCharacterForm({
  onSubmit,
  existingCharacterNames,
}: Readonly<AddCharacterFormProps>) {
  const { formState, handleSubmit, register } = useForm<AddCharacterFields>({
    resolver: addCharacterResolver(existingCharacterNames),
  })

  const handleOnSubmit = (data: AddCharacterFields) => {
    const { name, description, ...abilities } = data
    onSubmit({ name, description, abilities })
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
      <div className='grid grid-cols-1 space-x-3 sm:grid-cols-2 -mt-3 mb-6'>
        <Input
          onClick={noop}
          label='Proficiency Bonus'
          type='number'
          name='proficiency'
          min={-1}
          max={11}
          defaultValue={0}
          data-testid='add-character-form__proficiency'
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
          defaultValue={0}
          data-testid='add-character-form__cooking-ability'
          error={formState.errors.cookingAbility?.message}
          register={register}
          registerOptions={{ valueAsNumber: true }}
          required
        />
        <Switch
          labelSize='sm'
          label='Has Cooking Tools'
          name='hasCookingTools'
          data-testid='add-character-form__has-cooking-tools'
          register={register}
        />
      </div>
      <SubmitButton data-testid='add-character-form__submit' />
    </Form>
  )
}
