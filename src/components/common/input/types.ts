import type { InputHTMLAttributes } from 'react'
import type {
  FieldValue,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  name?: string
  register?: UseFormRegister<FieldValue<any>>
  registerOptions?: RegisterOptions
}

export interface SwitchProps
  extends Omit<InputProps, 'type' | 'error' | 'size'> {
  label: string
  defaultChecked?: boolean
  labelClassName?: string
  size?: 'sm' | 'md' | 'lg'
}

export interface CheckboxProps
  extends Omit<InputProps, 'type' | 'error' | 'size'> {
  label: string
  defaultChecked?: boolean
  labelClassName?: string
  size?: 'sm' | 'md' | 'lg'
}
