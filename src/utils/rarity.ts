import { RARITY_DC } from '@/constants/rarity'

export function getDCColor(dc: number) {
  if (dc < RARITY_DC.common) return 'text-rarity-common bg-rarity-common/10'
  if (dc < RARITY_DC.uncommon)
    return 'text-rarity-uncommon bg-rarity-uncommon/10'
  if (dc < RARITY_DC.rare) return 'text-rarity-rare bg-rarity-rare/10'
  if (dc < RARITY_DC['very-rare'])
    return 'text-rarity-very-rare bg-rarity-very-rare/10'
  if (dc < RARITY_DC.epic) return 'text-rarity-epic bg-rarity-epic/10'
}

export function isUncommon(rarity: string = ''): rarity is 'uncommon' {
  return rarity === 'uncommon'
}
export function isCommon(rarity: string = ''): rarity is 'common' {
  return rarity === 'common'
}
export function isRare(rarity: string = ''): rarity is 'rare' {
  return rarity === 'rare'
}
export function isVeryRare(rarity: string = ''): rarity is 'very-rare' {
  return rarity === 'very-rare'
}
export function isEpic(rarity: string = ''): rarity is 'epic' {
  return rarity === 'epic'
}
export function isLegendary(rarity: string = ''): rarity is 'legendary' {
  return rarity === 'legendary'
}
