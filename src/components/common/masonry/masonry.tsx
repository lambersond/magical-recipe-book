'use client'

import Masonry from 'react-masonry-css'

export function MasonryCustom({ children }: { children: React.ReactNode }) {
  return (
    <Masonry
      className='react-masonry'
      columnClassName='react-masonry_column'
      breakpointCols={{
        default: 4,
        1280: 3,
        1024: 2,
        768: 1,
      }}
    >
      {children}
    </Masonry>
  )
}
