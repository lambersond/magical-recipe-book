'use client'

import { useReducer, useState } from 'react'
import {
  createTrayState,
  type DieSides,
  type RollResult,
  trayPoolList,
  trayReducer,
  trayToRequest,
} from '@lambersond/3d-dice-core'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { Input } from '@/components/common'
import { useDice } from '@/hooks/dice'
import type { SurvivalCheckProps } from './types'

// Aid dice, e.g. +1d4 when a familiar or companion helps
const EXTRA_DICE: DieSides[] = [4, 6, 8, 10, 12]

function startingTray() {
  return trayReducer(createTrayState(), { type: 'incrementDie', sides: 20 })
}

/** e.g. "1d20 (14) + 1d4 (3) + 2", or "1d20 adv (9/14 → 14) + 2" */
export function describeRoll({ pools, modifier, advantage }: RollResult) {
  const parts = pools.map(({ count, sides, rolls, kept }) => {
    if (sides === 20 && advantage) {
      const pairs = rolls.map(pair => pair.join('/')).join(', ')
      return `${count}d${sides} ${advantage} (${pairs} → ${kept.join(', ')})`
    }
    return `${count}d${sides} (${kept.join(', ')})`
  })
  let text = parts.join(' + ')
  if (modifier > 0) text += ` + ${modifier}`
  if (modifier < 0) text += ` - ${-modifier}`
  return text
}

export function SurvivalCheck({ onRolled }: Readonly<SurvivalCheckProps>) {
  const { roll } = useDice()
  const [tray, dispatch] = useReducer(trayReducer, undefined, startingTray)
  const [bonus, setBonus] = useState('')
  const [rolling, setRolling] = useState(false)

  const handleRoll = async () => {
    setRolling(true)
    try {
      const result = await roll({
        ...trayToRequest(tray),
        modifier: Number(bonus) || 0,
      })
      onRolled(result.total, describeRoll(result))
    } finally {
      setRolling(false)
    }
  }

  return (
    <div className='flex flex-col gap-3 rounded-lg border border-border p-3'>
      <p className='text-sm font-bold text-text-secondary'>Survival check</p>
      <div className='flex flex-wrap items-center gap-2'>
        {trayPoolList(tray).map(({ sides, count }) => (
          <span
            key={sides}
            className='flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm'
          >
            {count}d{sides}
            {sides !== 20 && (
              <button
                type='button'
                aria-label={`Remove a d${sides}`}
                onClick={() => dispatch({ type: 'decrementDie', sides })}
                className='rounded-full hover:bg-white/10 cursor-pointer'
              >
                <X className='size-3.5' />
              </button>
            )}
          </span>
        ))}
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-xs text-text-secondary'>Add</span>
        {EXTRA_DICE.map(sides => (
          <button
            key={sides}
            type='button'
            aria-label={`Add a d${sides}`}
            onClick={() => dispatch({ type: 'incrementDie', sides })}
            className='rounded-md border border-border px-2 py-0.5 text-sm hover:bg-white/10 cursor-pointer'
          >
            +d{sides}
          </button>
        ))}
        <span className='ml-auto flex gap-1'>
          {(['adv', 'dis'] as const).map(value => (
            <button
              key={value}
              type='button'
              aria-pressed={tray.advantage === value}
              onClick={() => dispatch({ type: 'toggleAdvantage', value })}
              className={clsx(
                'rounded-md border px-2 py-0.5 text-sm cursor-pointer',
                tray.advantage === value
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-border hover:bg-white/10',
              )}
            >
              {value === 'adv' ? 'Advantage' : 'Disadvantage'}
            </button>
          ))}
        </span>
      </div>
      <div className='flex items-end gap-3'>
        <Input
          label='Bonus'
          name='survival-bonus'
          type='number'
          value={bonus}
          onChange={e => setBonus(e.target.value)}
          placeholder='0'
          hint='Survival modifier, +2 with help'
          hideError
          containerClassName='max-w-40'
        />
        <button
          type='button'
          onClick={handleRoll}
          disabled={rolling}
          className='mb-6 rounded-xl bg-white/10 px-4 py-2 font-bold uppercase hover:bg-white/20 cursor-pointer disabled:opacity-50'
        >
          {rolling ? 'Rolling…' : 'Roll'}
        </button>
      </div>
    </div>
  )
}
