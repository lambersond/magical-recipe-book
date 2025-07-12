'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowDownIcon } from '../icons/arrow-down'
import type { DropdownOption, DropdownProps } from './types'

export function Dropdown<S, T>({
  options,
  onSelect,
  width = 'w-72',
  label,
  name = 'dropdown',
  selected,
  defaultEmpty = false,
  placeholder = 'No options available',
  ...props
}: Readonly<DropdownProps<S, T>>) {
  const [open, setOpen] = useState(false)
  const [choice, setChoice] = useState(() =>
    defaultEmpty || !options?.[0]
      ? { id: 'default-empty', label: placeholder }
      : options[0],
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (selected) {
      setChoice(selected)
    }
  }, [selected])

  const handleSelect = (option: DropdownOption<S, T>) => () => {
    setChoice(option)
    onSelect(option)
    setOpen(false)
  }

  return (
    <div
      ref={dropdownRef}
      className='relative inline-flex flex-col text-left w-fit rounded-md'
    >
      {!!label && (
        <label
          className='text-sm text-text-secondary font-bold uppercase'
          htmlFor={name}
        >
          {label}
          {props.required && <sup>*</sup>}
        </label>
      )}
      <button
        name={name}
        type='button'
        data-testid='Dropdown__button'
        onClick={() => setOpen(!open)}
        className={`
          inline-flex justify-between ${width} rounded-md border border-border
          pl-4 pr-2 py-2 bg-paper text-md text-text-primary focus:outline-none
          cursor-pointer hover:bg-paper/75
        `}
      >
        {choice.label}
        <ArrowDownIcon className='ml-auto' />
      </button>
      {open && (
        <div
          className={`origin-bottom-right absolute left-0 top-full ${width} rounded-sm bg-paper shadow-lg`}
        >
          <div className='py-1 cursor-pointer'>
            {options.map(option => (
              <button
                key={`${option.id}-${option.label}`}
                data-testid={`Dropdown__option-${option.id}`}
                onClick={handleSelect(option)}
                className='w-full text-left px-4 py-2 text-md text-text-secondary hover:text-text-primary hover:bg-neutral-950/50 cursor-pointer'
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
