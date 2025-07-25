'use client'

import { useEffect, useState } from 'react'
import { Dropdown, Modal, Switch } from '@/components/common'
import { DropdownOption } from '@/components/common/dropdown'
import { useModals } from '@/hooks/use-modals'
import { Ingredient } from '@/types'
import type { GoForagingModalProps } from './types'

export function GoForagingModal({
  onSubmit,
  open,
}: Readonly<GoForagingModalProps>) {
  const { closeModal } = useModals()
  const [quantity, setQuantity] = useState(0)
  const [magicalIngredient, setMagicalIngredient] = useState('')
  const [isMagical, setIsMagical] = useState(true)
  const [magicalOptions, setMagicalOptions] = useState<DropdownOption[]>([])
  const foragingOptionText = isMagical
    ? 'Ingredient Foraged'
    : 'Quantity Foraged'

  const handleOnSubmit = async () => {
    onSubmit({
      quantity: isMagical ? 0 : quantity,
      isMagical,
      magicalIngredientId: isMagical ? magicalIngredient : undefined,
    })
    // onClose()
  }

  const onClose = () => {
    closeModal('GoForagingModal')
  }

  const handleSwitchChange = ({ target: { checked } }: any) => {
    setIsMagical(checked)
  }

  const handleOnSelect = (option: DropdownOption) => {
    setMagicalIngredient(option.id)
    setQuantity(1)
  }

  useEffect(() => {
    const getMagicalOptions = async () => {
      const response = await fetch('/api/ingredients')
      const data = await response.json()
      const options = data.map((item: Ingredient) => ({
        id: item.id,
        label: item.name,
        searchText: item.name,
        value: item.id,
      })) as DropdownOption[]
      setMagicalOptions(options)
    }
    getMagicalOptions()
  }, [])

  useEffect(() => {
    if (!open) {
      setQuantity(0)
      setMagicalIngredient('')
      setIsMagical(true)
    }
  }, [open])

  return (
    <Modal
      title='🌿 Go Foraging'
      headerClassName='bg-gradient-to-r from-green-600/70 to-emerald-600/60 h-20'
      isOpen={!!open}
      onClose={onClose}
    >
      <div className='flex flex-col py-4'>
        <Switch
          label='Foraging Type'
          defaultChecked
          orientation='vertical'
          leftText='Common'
          labelSize='sm'
          rightText='Magical'
          onChange={handleSwitchChange}
        />
        <div className='min-h-40'>
          <p className='text-md font-bold text-text-secondary mb-2'>
            {foragingOptionText}
          </p>
          <div className='grid grid-cols-3 gap-2'>
            {isMagical ? (
              <Dropdown
                options={magicalOptions}
                placeholder='Select Magical Ingredient'
                onSelect={handleOnSelect}
                width='w-96'
                searchable
              />
            ) : (
              [2, 3, 4, 5, 6, 7].map(num => (
                <button
                  key={num}
                  type='button'
                  onClick={() => setQuantity(num)}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    quantity === num
                      ? 'border-green-400 bg-green-900/30 text-green-300 shadow-md'
                      : 'border-gray-600 hover:border-green-500 hover:bg-green-900/20 text-gray-300 hover:text-green-300'
                  }`}
                >
                  <span className='font-semibold text-lg'>{num}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
      <div className='flex gap-4 mt-4'>
        <button
          className='bg-gray-600/40 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex-1'
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex-1'
          onClick={() => {
            handleOnSubmit()
            onClose()
          }}
        >
          Log Results
        </button>
      </div>
    </Modal>
  )
}
