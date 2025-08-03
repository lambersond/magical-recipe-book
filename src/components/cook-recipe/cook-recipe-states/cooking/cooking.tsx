import { useState } from 'react'
import { SeeResultsButton } from '../../buttons'
import {
  useDishActions,
  useSetCookingResults,
} from '../../hooks/use-cook-recipe'

export function Cooking() {
  const [rollResult, setRollResult] = useState(0)
  const [isFocused, setIsFocused] = useState(false)

  const { cook } = useDishActions()
  const setCookingResults = useSetCookingResults()

  const onNext = () => {
    setCookingResults(rollResult)
    cook()
  }

  const isReady = rollResult > 0 && rollResult <= 50

  const displayValue = () => {
    if (isFocused) {
      return rollResult === 0 ? '' : rollResult.toString()
    }
    return rollResult === 0 ? '0' : rollResult.toString()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRollResult(value === '' ? 0 : Number(value))
  }

  return (
    <span className='flex flex-col items-center justify-center gap-4'>
      <p className='text-3xl'>Enter your roll results</p>
      <input
        tabIndex={0}
        type='number'
        max={50}
        className='size-24 border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg text-center text-text-primary font-bold text-5xl'
        value={displayValue()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
      />
      <SeeResultsButton disabled={!isReady} onClick={onNext} />
    </span>
  )
}
