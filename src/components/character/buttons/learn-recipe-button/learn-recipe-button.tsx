'use client'

import { BookPlus } from 'lucide-react'
import { useCharacterActions } from '../../hooks/use-character-actions'

export function LearnRecipeButton({ className }: { className?: string }) {
  const { learnRecipe } = useCharacterActions()

  return (
    <button
      onClick={learnRecipe.onClick}
      className={`${className} py-1.75 px-6 bg-gradient-to-r from-blue-600/70 to-sky-600/60 rounded-xl text-text-primary font-semibold text-lg hover:bg-primary/80 transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
    >
      <BookPlus />
    </button>
  )
}
