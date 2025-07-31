import clsx from 'classnames'

export function characterCardStyles(details: 'lite' | 'full') {
  const cardClasses = clsx(
    {
      'gap-0 border-border bg-page/40': details === 'lite',
      'gap-6 border-transparent': details === 'full',
    },
    'border flex flex-col hover:border-primary/50 transition-all duration-200 ease-in-out after:text-text-primary after:absolute after:bottom-4 after:right-4 after:text-xs after:font-thin hover:after:content-["Click_to_view_→"] hover:after:text-primary relative',
  )
  const headerClasses = clsx(
    {
      'gap-2': details === 'lite',
      'gap-4': details === 'full',
    },
    'flex',
  )
  const nameClasses = clsx(
    {
      'text-xl lg:text-2xl -mt-1.25': details === 'lite',
      'text-3xl lg:text-5xl': details === 'full',
    },
    'font-bold truncate bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-left',
  )
  const dayClasses = clsx(
    {
      'text-xs lg:text-md -mt-2.5': details === 'lite',
      'text-sm lg:text-lg': details === 'full',
    },
    'text-text-secondary flex gap-1 items-baseline',
  )
  const numberClasses = clsx(
    {
      'text-xl': details === 'lite',
      'text-2xl': details === 'full',
    },
    'text-text-primary font-bold',
  )
  const statsContainerClasses = clsx(
    {
      'grid-cols-1 md:grid-cols-3': details === 'full',
      'grid-cols-3': details === 'lite',
    },
    'grid gap-3 mb-auto',
  )
  const headerTextClasses = clsx(
    {
      'h-fit': details === 'lite',
      'h-unset': details === 'full',
    },
    'grid gap-1',
  )

  return {
    cardClasses,
    headerClasses,
    nameClasses,
    dayClasses,
    numberClasses,
    statsContainerClasses,
    headerTextClasses,
  }
}

export function characterCardStatStyles(details: 'lite' | 'full') {
  const valueClasses = clsx(
    {
      'text-lg': details === 'lite',
      'text-5xl': details === 'full',
    },
    'font-bold text-text-primary',
  )

  const containerClasses = clsx(
    {
      'gap-2 py-2': details === 'lite',
      'bg-page/50 p-4 flex-col items-center justify-center': details === 'full',
    },
    'rounded-lg flex',
  )

  return { valueClasses, containerClasses }
}
