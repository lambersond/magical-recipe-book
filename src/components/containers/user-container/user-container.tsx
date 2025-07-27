import { CharacterCard } from '@/components/cards'
import { characterService } from '@/server/characters'

export async function UserContainer({ userId }: { userId: string }) {
  const characters = await characterService.getUserCharactersLite(userId)

  return (
    <>
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          currentDay={character.currentDay}
          description={character.description}
          image={character.image}
          recipes={character.cookbook?._count.knownRecipes}
          commonIngredients={character.ingredientsPouch?.commonIngredients}
          magicalIngredients={
            character.ingredientsPouch?._count.magicalIngredients
          }
          updatedAt={character.updatedAt}
        />
      ))}
    </>
  )
}
