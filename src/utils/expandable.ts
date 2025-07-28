import type { MouseEventHandler } from 'react'

export const updateStateAttribute: MouseEventHandler<HTMLButtonElement> = e => {
  const currentTarget = e.currentTarget
  const isOpen = currentTarget.dataset.state === 'true'
  const newState = (!isOpen).toString()
  currentTarget.dataset.state = newState

  const expandableSections = currentTarget.querySelectorAll(
    '[data-expandable]',
  ) as NodeListOf<HTMLDivElement>
  for (const section of expandableSections) {
    section.dataset.state = newState
  }
}

export const expandablePaneWithBorderClasses =
  'overflow-hidden transition-all duration-300 ease-in-out border-t border-border grid lg:grid-cols-2 pt-4 data-[state=false]:max-h-0 data-[state=false]:opacity-0 data-[state=false]:mt-0 data-[state=true]:max-h-[1000px] data-[state=true]:opacity-100 data-[state=true]:mt-4'

export const expandablePaneClasses =
  'overflow-hidden transition-all duration-300 ease-in-out data-[state=false]:max-h-0 data-[state=false]:opacity-0 data-[state=false]:mt-0 data-[state=true]:max-h-[1000px] data-[state=true]:opacity-100 data-[state=true]:mt-4'
