import { Menu } from '../menu'
import { Popover } from '../popover'
import { Card } from './card'
import type { CardWithActionsProps } from './types'

export function CardWithActions({
  children,
  title,
  options,
  ...cardProps
}: CardWithActionsProps) {
  const showOptions = options.length > 0
  return (
    <Card {...cardProps}>
      <div className='flex justify-between items-start gap-2 w-full'>
        <div className='text-xl text-left font-bold break-all self-center'>
          {title}
        </div>
        {showOptions && (
          <Popover
            content={<Menu options={options} />}
            placement='top'
            asChild
            asKabab
          />
        )}
      </div>
      {children}
    </Card>
  )
}
