import { useState } from 'react'
import { SeeResultsButton } from '../../buttons'
import {
  useCookingApi,
  useSetCookingResults,
} from '../../hooks/use-cook-recipe'

export function Cooking() {
  const [rollResult, setRollResult] = useState(0)
  const { finishCooking } = useCookingApi()
  const setCookingResults = useSetCookingResults()

  const onNext = () => {
    setCookingResults(rollResult)
    finishCooking()
  }

  const isReady = rollResult > 0 && rollResult <= 50

  return (
    <span className='flex flex-col items-center justify-center gap-4'>
      <p className='text-3xl'>Enter your roll results</p>
      <input
        tabIndex={0}
        type='number'
        min={0}
        max={50}
        className='size-24 border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg text-center text-text-primary font-bold text-5xl'
        value={rollResult}
        onChange={e => setRollResult(Number(e.target.value))}
        placeholder='0'
        autoFocus
        autoComplete='off'
        autoCorrect='off'
      />
      <SeeResultsButton disabled={!isReady} onClick={onNext} />
    </span>
  )
}
