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
