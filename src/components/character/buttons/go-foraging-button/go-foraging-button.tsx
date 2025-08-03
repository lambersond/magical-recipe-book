'use client'

import { Binoculars } from 'lucide-react'
import { useCharacterActions } from '../../hooks/use-character-actions'

export function GoForagingButton({ className }: { className?: string }) {
  const { forage } = useCharacterActions()

  return (
    <button
      onClick={forage.onClick}
      className={`${className} p-1.75 md:px-6 bg-gradient-to-r from-green-600/70 to-emerald-600/60 rounded-xl text-text-primary font-semibold text-lg hover:bg-primary/80 transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
    >
      <Binoculars />
    </button>
  )
}
