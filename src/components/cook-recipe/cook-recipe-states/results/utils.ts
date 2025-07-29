import clsx from 'classnames'
import type { CookingResult } from './types'

export function getCookingResult(
  rollResult: number,
  dc: number,
): CookingResult {
  const difference = rollResult - dc

  if (difference <= -5) {
    return {
      emoji: '💀',
      type: 'failure',
      text: 'Critical Failure',
      flavorText: 'baneText',
      unlocksMagicModifiers: true,
    }
  }

  if (difference < 0) {
    const emojiMap: Record<number, string> = {
      [-4]: '🤮',
      [-3]: '🤢',
      [-2]: '🥴',
      [-1]: '🤯',
    }

    return {
      emoji: emojiMap[difference] || '🤮',
      type: 'failure',
      text: 'Failure',
      flavorText: 'baneText',
      unlocksMagicModifiers: false,
    }
  }

  if (difference >= 5) {
    return {
      emoji: '✨',
      type: 'success',
      text: 'Critical Success',
      flavorText: 'boonText',
      unlocksMagicModifiers: true,
    }
  }

  const successEmojiMap: Record<number, string> = {
    [0]: '👌',
    [1]: '😋',
    [2]: '🤤',
    [3]: '🤩',
    [4]: '🥳',
  }

  return {
    emoji: successEmojiMap[difference] || '👌',
    type: 'success',
    text: 'Success',
    flavorText: 'boonText',
    unlocksMagicModifiers: false,
  }
}

export function getStyles(type: CookingResult['type']) {
  const titleClasses = clsx(
    {
      'text-success bg-success/10': type === 'success',
      'text-danger bg-danger/10': type === 'failure',
    },
    'text-3xl font-semibold py-3 px-5 rounded-lg text-center',
  )
  return {
    titleClasses,
  }
}
