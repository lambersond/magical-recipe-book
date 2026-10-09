'use client'

import { useState } from 'react'
import {
  formatResultExpression,
  parseRollExpression,
  type RollResult,
} from '@lambersond/3d-dice-core'
import { useDice } from '@/hooks/dice'

export default function DicePage() {
  const { roll } = useDice()
  const [notation, setNotation] = useState('1d20 + 5d8 - 3')
  const [result, setResult] = useState<RollResult>()
  const [error, setError] = useState('')

  async function onClick() {
    const parsed = parseRollExpression(notation)
    if (!parsed.ok) {
      setError(parsed.error)
      return
    }
    setError('')
    setResult(await roll(parsed.request))
  }

  return (
    <div className='flex flex-col items-center justify-center p-20 gap-8'>
      <h1 className='text-4xl font-bold text-center'>
        This is a temp page for testing the 3D dice
      </h1>
      <input
        type='text'
        value={notation}
        onChange={e => setNotation(e.target.value)}
        className='border border-gray-300 rounded px-4 py-2 text-lg w-64'
        placeholder='Enter dice notation (e.g., 1d20 + 3 adv, 2d6!)'
      />
      <button
        className='text-4xl font bold rounded-2xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer transition-colors duration-300'
        onClick={onClick}
      >
        Roll Dice
      </button>
      <div className='flex flex-col items-center justify-center'>
        <div className='min-w-32 h-32 border-primary border bg-black/20 rounded-lg shadow-lg flex items-center justify-center'>
          <p className='text-7xl'>{result?.total ?? 0}</p>
        </div>
        {error ? (
          <p className='text-danger p-2'>{error}</p>
        ) : (
          result && (
            <p className='text-text-secondary p-2'>
              {formatResultExpression(result)}:{' '}
              {result.pools.map(pool => pool.kept.join(', ')).join(' | ')}
            </p>
          )
        )}
      </div>
    </div>
  )
}
