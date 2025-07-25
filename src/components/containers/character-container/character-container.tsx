import { notFound } from 'next/navigation'
import { CharacterHeader } from '@/components/character'
import { CharacterTabs } from '@/components/character/character-tabs'
import { CharacterWrapper } from '@/components/character/character-wrapper'
import { characterService } from '@/server/characters'

export async function CharacterContainer({
  id,
  userId,
}: {
  id: string
  userId: string
}) {
  const character = await characterService.getCharacterByIdAndUserId(id, userId)

  if (!character) {
    notFound()
  }

  return (
    <div className='bg-page'>
      <CharacterWrapper character={character}>
        <CharacterHeader />
        <CharacterTabs />
      </CharacterWrapper>
    </div>
  )
}
