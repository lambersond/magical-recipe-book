import { Detail } from './detail'
import { useCharacter } from '@/components/character/hooks/use-character'
import { Card } from '@/components/common'
import { RollableField } from '@/components/rollable-field'

const DEFAULT_DESCRIPTION =
  'A weathered wanderer with no memory of their past, they carry only fragments of instinct and a haunting sense that something—or someone—is still searching for them.'

function alertUser(message: string) {
  // eslint-disable-next-line no-alert
  alert(message)
}

export function CharacterDetails() {
  const { description, createdAt, updatedAt, abilities } = useCharacter()
  const tools = []
  if (abilities.hasCookingTools) {
    tools.push('Cooking Tools')
  }
  if (tools.length === 0) {
    tools.push('None')
  }
  return (
    <Card className='border border-border'>
      <h2 className='text-xl font-semibold mb-4 text-white'>
        Character Details
      </h2>
      <div className='space-y-4'>
        <Detail
          label='Description'
          detail={description || DEFAULT_DESCRIPTION}
        />
        <div className='grid grid-cols-3 gap-1'>
          <RollableField
            topLabel='Proficiency'
            topLabelColor='secondary'
            bottomLabel='bonus'
            number={abilities.proficiency}
            onClick={results => alertUser(`Your total roll is a ${results[0]}`)}
          />
          <RollableField
            topLabel='Cooking'
            topLabelColor='secondary'
            bottomLabel='Skill'
            number={abilities.cookingAbility}
            onClick={results => alertUser(`Your total roll is a ${results[0]}`)}
          />
          <Detail label='Tools' detail={tools.join(', ')} />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Detail
            label='Created'
            detail={new Date(createdAt).toLocaleDateString()}
          />
          <Detail
            label='Last Updated'
            detail={new Date(updatedAt).toLocaleDateString()}
          />
        </div>
      </div>
    </Card>
  )
}
