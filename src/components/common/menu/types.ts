export type MenuProps = {
  options: Option[] | GroupOption[]
}

export type OptionsProps = {
  options: Option[]
  hideBorder?: boolean
  indent?: boolean
}

export type GroupOption = {
  label?: string
  icon?: React.ReactNode
  key: string
  showHeader?: boolean
  options: Option[]
}

export type Option = {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  icon?: React.ReactNode
}
