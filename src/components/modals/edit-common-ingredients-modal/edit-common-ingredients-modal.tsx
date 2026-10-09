'use client'

import { useState } from 'react'
import { Modal } from '@/components/common'
import { EditCommonIngredientsForm } from '@/components/forms'
import { useModals } from '@/hooks/use-modals'
import type { EditCommonIngredientsModalProps } from './types'

export function EditCommonIngredientsModal({
  open,
  recipeName,
  mundaneIngredients = [],
  defaultMundaneIngredients = [],
  onSubmit,
}: Readonly<EditCommonIngredientsModalProps>) {
  const { closeModal } = useModals()
  const [error, setError] = useState('')

  const onClose = () => {
    setError('')
    closeModal('EditCommonIngredientsModal')
  }

  const handleOnSubmit = async (names: string[]) => {
    try {
      await onSubmit(names)
      onClose()
    } catch (error_) {
      setError(
        error_ instanceof Error ? error_.message : 'Could not save changes',
      )
    }
  }

  return (
    <Modal
      title={`🌿 ${recipeName ?? ''}`}
      headerClassName='bg-gradient-to-r from-green-600/70 to-emerald-600/60'
      isOpen={!!open}
      onClose={onClose}
    >
      <p className='text-text-secondary text-sm py-4'>
        Rename the common ingredients for your cookbook. The originals are shown
        as placeholders.
      </p>
      {open && (
        <EditCommonIngredientsForm
          mundaneIngredients={mundaneIngredients}
          defaultMundaneIngredients={defaultMundaneIngredients}
          onSubmit={handleOnSubmit}
        />
      )}
      {error && <p className='text-danger text-sm pt-2'>{error}</p>}
    </Modal>
  )
}
