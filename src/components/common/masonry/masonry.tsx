'use client'

import Masonry from 'react-masonry-css'

export function MasonryCustom({
  children,
  breakpointCols = {
    default: 4,
    1280: 3,
    1024: 2,
    768: 1,
  },
}: {
  children: React.ReactNode
  breakpointCols?: Record<string, number>
}) {
  return (
    <Masonry
      className='react-masonry'
      columnClassName='react-masonry_column'
      breakpointCols={breakpointCols}
    >
      {children}
    </Masonry>
  )
}
