'use client'

import { useEffect, useState } from 'react'
import { SurvivalCheck } from './survival-check'
import { RarityChip } from '@/components/chips'
import { Dropdown, Input } from '@/components/common'
import { forageBiomeSchema } from '@/schemas/foraging'
import { primaryButton, secondaryButton } from '@/utils/styles'
import type { ForageBiomeProps } from './types'
import type { BiomeForagingResult, BiomeOption } from '@/types'

// In game mode the roll result comes only from the Survival check's dice
const GAME_MODE_ROLL_PROMPT = 'Roll your Survival check above'

export function ForageBiome({
  characterId,
  mode,
  onForaged,
  onClose,
}: Readonly<ForageBiomeProps>) {
  const isGameMode = mode === 'game'
  const [biomes, setBiomes] = useState<BiomeOption[]>([])
  const [biomeId, setBiomeId] = useState('')
  const [rollResult, setRollResult] = useState('')
  const [rollDetail, setRollDetail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<BiomeForagingResult>()

  useEffect(() => {
    const getBiomes = async () => {
      const response = await fetch('/api/biomes')
      setBiomes(await response.json())
    }
    getBiomes()
  }, [])

  const handleRolled = (total: number, detail: string) => {
    setRollResult(String(total))
    setRollDetail(detail)
    setError('')
  }

  const handleForage = async () => {
    const parsed = forageBiomeSchema.safeParse({
      biomeId,
      roll: rollResult === '' ? undefined : Number(rollResult),
    })
    if (!parsed.success) {
      const [issue] = parsed.error.issues
      setError(
        isGameMode && issue.path[0] === 'roll'
          ? GAME_MODE_ROLL_PROMPT
          : issue.message,
      )
      return
    }

    setSubmitting(true)
    setError('')
    try {
      const response = await fetch(
        `/api/characters/${characterId}/forage/biome`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        },
      )
      const data = await response.json()
      if (!response.ok) {
        setError(data.error ?? 'Foraging failed, try again')
        return
      }
      setResult(data)
      if (data.success) onForaged(data)
    } finally {
      setSubmitting(false)
    }
  }

  const forageAgain = () => {
    setResult(undefined)
    setRollResult('')
    setRollDetail('')
  }

  if (result) {
    const { ingredient, dc, roll } = result
    return (
      <div className='flex flex-col gap-4 pt-2'>
        <div
          className={`rounded-lg border p-4 ${ingredient ? 'border-success/60 bg-success/10' : 'border-danger/60 bg-danger/10'}`}
        >
          <p className='text-sm font-bold uppercase text-text-secondary'>
            {ingredient ? 'You found' : 'Nothing found'}
          </p>
          {ingredient ? (
            <>
              <div className='flex items-center justify-between gap-2 py-1'>
                <p className='text-2xl font-bold'>{ingredient.name}</p>
                <RarityChip rarity={ingredient.rarity} />
              </div>
              <p className='text-sm text-text-secondary italic'>
                {ingredient.description}
              </p>
            </>
          ) : (
            <p className='text-xl font-bold py-1'>
              You were unable to locate a magical plant
            </p>
          )}
          <p className='pt-3 font-semibold' data-testid='forage-biome__outcome'>
            Rolled {roll} vs DC {dc}:{' '}
            {ingredient
              ? 'added to your ingredients pouch.'
              : 'nothing was added.'}
          </p>
        </div>
        <div className='flex justify-end gap-2'>
          <button
            type='button'
            className={secondaryButton}
            onClick={forageAgain}
          >
            Forage again
          </button>
          <button type='button' className={primaryButton} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 pt-2'>
      <Dropdown
        label='Biome'
        placeholder='Select a biome'
        // Remounts after "Forage again", so restore the chosen biome
        defaultEmpty={!biomeId}
        defaultSelectedId={biomeId || undefined}
        options={biomes.map(biome => ({
          id: biome.id,
          label: `${biome.image ?? ''} ${biome.name}`.trim(),
          searchText: biome.name,
          value: biome.id,
        }))}
        onSelect={option => setBiomeId(option.id)}
        searchable
      />
      <SurvivalCheck onRolled={handleRolled} />
      <Input
        label='Roll result'
        name='roll-result'
        type='number'
        value={rollResult}
        readOnly={isGameMode}
        onChange={e => {
          setRollResult(e.target.value)
          setRollDetail('')
        }}
        placeholder={
          isGameMode
            ? GAME_MODE_ROLL_PROMPT
            : 'Roll above, or enter your own roll'
        }
        hint={rollDetail}
        error={error}
      />
      <div className='flex justify-end gap-2'>
        <button type='button' className={secondaryButton} onClick={onClose}>
          Cancel
        </button>
        <button
          type='button'
          className={primaryButton}
          onClick={handleForage}
          disabled={submitting}
        >
          {submitting ? 'Foraging…' : 'Forage'}
        </button>
      </div>
    </div>
  )
}
