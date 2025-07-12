import { Options } from './options'
import type { GroupOption } from './types'

export function Group({
  label,
  icon,
  options,
  showHeader,
}: Readonly<GroupOption>) {
  return (
    <div className='text-text-secondary hover:text-text-primary text-md'>
      <div
        key={label}
        className={`bg-secondary/50 py-1 p-2 text-primary font-bold flex items-center justify-between ${showHeader ? 'block' : 'hidden'}`}
      >
        {label}
        {icon}
      </div>
      <Options options={options} hideBorder indent />
    </div>
  )
}
