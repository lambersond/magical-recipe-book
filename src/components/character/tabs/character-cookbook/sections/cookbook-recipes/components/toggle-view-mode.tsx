'use client'

import { AlignJustify, Grid2x2 } from 'lucide-react'
import {
  useCharacterCookbook,
  useCharacterCookbookApi,
} from '@/components/character/hooks/use-character-cookbook'
import { ButtonGroup } from '@/components/common'

export function ToggleViewMode() {
  const { viewMode } = useCharacterCookbook()
  const { setViewMode } = useCharacterCookbookApi()

  return (
    <div className='flex justify-end'>
      <ButtonGroup
        options={[
          { id: 'list', icon: AlignJustify },
          { id: 'card', icon: Grid2x2 },
        ]}
        selected={viewMode}
        onChange={id => setViewMode(id)}
      />
    </div>
  )
}
