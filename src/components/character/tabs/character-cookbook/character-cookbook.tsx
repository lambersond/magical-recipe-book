'use client'

import { CharacterCookbookProvider } from '../../providers/character-cookbook-provider'
import { CookbookHeader, CookbookRecipes } from './sections'

export function CharacterCookbook() {
  return (
    <CharacterCookbookProvider>
      <div className='max-w-7xl space-y-6 py-6'>
        <CookbookHeader />
        <CookbookRecipes />
      </div>
    </CharacterCookbookProvider>
  )
}
