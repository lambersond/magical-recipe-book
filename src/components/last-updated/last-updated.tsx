'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'

export function LastUpdated({ lastUpdated }: { lastUpdated: Date }) {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    setFormattedDate(format(lastUpdated, 'Pp'))
  }, [lastUpdated])

  return (
    <div className='text-sm text-left text-text-secondary/50'>
      Last updated: {formattedDate}
    </div>
  )
}
