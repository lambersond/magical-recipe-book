import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, Input, SubmitButton } from '@/components/common'
import {
  SENDING_STONE_TOKEN_MAX_LENGTH,
  type SendingStoneLinkFields,
  sendingStoneLinkSchema,
} from '@/schemas/sending-stone'
import type { LinkSendingStoneFormProps } from './types'

export function LinkSendingStoneForm({
  onSubmit,
}: Readonly<LinkSendingStoneFormProps>) {
  const { formState, handleSubmit, register } = useForm<SendingStoneLinkFields>(
    {
      resolver: zodResolver(sendingStoneLinkSchema),
    },
  )

  const handleOnSubmit = (data: SendingStoneLinkFields) => onSubmit(data.token)

  return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <Input
        label='Link code'
        name='token'
        autoComplete='off'
        spellCheck={false}
        maxLength={SENDING_STONE_TOKEN_MAX_LENGTH}
        error={formState.errors.token?.message}
        data-testid='link-sending-stone-form__token'
        register={register}
      />
      <div className='flex justify-end gap-2 mt-2'>
        <SubmitButton disabled={formState.isSubmitting}>Link</SubmitButton>
      </div>
    </Form>
  )
}
