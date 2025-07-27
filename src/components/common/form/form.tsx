import type { Form } from './types'

export function Form({ children, ...formProps }: Form) {
  return (
    <form
      className='flex flex-col bg-paper rounded-lg min-w-80 h-fit'
      {...formProps}
    >
      {children}
    </form>
  )
}
