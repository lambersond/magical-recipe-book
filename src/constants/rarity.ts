import type { Rarity } from '@/types'

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 10,
  uncommon: 20,
  rare: 30,
  'very-rare': 40,
  epic: 50,
  legendary: 60,
} as const

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  'very-rare': 'Very Rare',
  epic: 'Epic',
  legendary: 'Legendary',
} as const

export const RARITY_DC: Record<Rarity, number> = {
  common: 10,
  uncommon: 12,
  rare: 15,
  'very-rare': 18,
  epic: 22,
  legendary: 26,
} as const
