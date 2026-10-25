'use client'

import { useState } from 'react'
import { Dices, type LucideIcon, PencilLine } from 'lucide-react'
import { SendingStoneLink } from './sending-stone-link'
import { ButtonGroup, Switch } from '@/components/common'
import { DEFAULT_CHARACTER_MODE } from '@/constants/character-settings'
import { primaryButton, secondaryButton } from '@/utils/styles'
import type { CharacterSettingsPanelProps } from './types'
import type { CharacterMode } from '@/types'

const MODES: {
  id: CharacterMode
  text: string
  icon: LucideIcon
  description: string
}[] = [
  {
    id: 'companion',
    text: 'Companion',
    icon: PencilLine,
    description: 'You enter your own roll results when foraging.',
  },
  {
    id: 'game',
    text: 'Game',
    icon: Dices,
    description:
      'Foraging rolls come from the app’s dice, and magical ingredients only from biomes.',
  },
]

export function CharacterSettingsPanel({
  settings,
  isSendingStoneEnabled = false,
  onSave,
  onLink,
  onUnlink,
  onClose,
}: Readonly<CharacterSettingsPanelProps>) {
  const [mode, setMode] = useState(settings?.mode ?? DEFAULT_CHARACTER_MODE)
  const [sendToFoundry, setSendToFoundry] = useState(
    settings?.sendToFoundry ?? false,
  )
  // Linking saves at once, so it's kept here rather than read from settings
  const [linkedAt, setLinkedAt] = useState(settings?.sendingStoneLinkedAt)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    // A code typed but not linked would be lost, and Send would open settings
    if (isSendingStoneEnabled && sendToFoundry && !linkedAt) {
      setError('Link this character first, or turn sending off.')
      return
    }
    setSaving(true)
    setError('')
    try {
      await onSave(isSendingStoneEnabled ? { mode, sendToFoundry } : { mode })
      onClose()
    } catch (error_) {
      setError(
        error_ instanceof Error
          ? error_.message
          : 'Could not save the settings',
      )
      setSaving(false)
    }
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-bold text-text-secondary'>Mode</p>
        <ButtonGroup<CharacterMode>
          options={MODES}
          selected={mode}
          onChange={setMode}
        />
        <p className='text-sm text-text-secondary italic'>
          {MODES.find(({ id }) => id === mode)?.description}
        </p>
      </div>
      {isSendingStoneEnabled && (
        <div className='flex flex-col gap-2'>
          <Switch
            label='Send to FoundryVTT via the Sending Stone'
            name='send-to-foundry'
            checked={sendToFoundry}
            onChange={e => setSendToFoundry(e.target.checked)}
          />
          {sendToFoundry && (
            <SendingStoneLink
              linkedAt={linkedAt}
              onLink={async token => {
                setLinkedAt(await onLink(token))
                setError('')
                // Linked is sending, even if the player closes without Save
                await onSave({ sendToFoundry: true })
              }}
              onUnlink={async () => setLinkedAt(await onUnlink())}
            />
          )}
        </div>
      )}
      {error && <p className='text-danger text-sm'>{error}</p>}
      <div className='flex justify-end gap-2'>
        <button type='button' className={secondaryButton} onClick={onClose}>
          Cancel
        </button>
        <button
          type='button'
          className={primaryButton}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  )
}
