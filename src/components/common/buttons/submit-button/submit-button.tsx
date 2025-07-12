import { primaryButton } from '@/utils/styles'

export function SubmitButton({
  children = 'submit',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type='submit' className={primaryButton} {...props}>
      {children}
    </button>
  )
}
