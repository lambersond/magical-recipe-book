// The words a dish's effect is described in for Foundry, as D&D Fifth Edition
// names them: dnd5e's own keys for abilities and skills, and its damage types
// and conditions. Imported by the seed data too, so it imports nothing.

export const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const

export const SKILLS = [
  'acr',
  'ani',
  'arc',
  'ath',
  'dec',
  'his',
  'ins',
  'itm',
  'inv',
  'med',
  'nat',
  'prc',
  'prf',
  'per',
  'rel',
  'slt',
  'ste',
  'sur',
] as const

export const DAMAGE_TYPES = [
  'acid',
  'bludgeoning',
  'cold',
  'fire',
  'force',
  'lightning',
  'necrotic',
  'piercing',
  'poison',
  'psychic',
  'radiant',
  'slashing',
  'thunder',
] as const

export const CONDITIONS = [
  'blinded',
  'charmed',
  'deafened',
  'exhaustion',
  'frightened',
  'grappled',
  'incapacitated',
  'invisible',
  'paralyzed',
  'petrified',
  'poisoned',
  'prone',
  'restrained',
  'stunned',
  'unconscious',
] as const

export const SENSES = [
  'blindsight',
  'darkvision',
  'tremorsense',
  'truesight',
] as const

export const ROLL_MODES = ['advantage', 'disadvantage'] as const

/** What a flat bonus applies to: every attack, damage, ability check or save. */
export const BONUS_ROLLS = ['attack', 'damage', 'check', 'save'] as const

/** A dish's boon or bane lasts 24 in-game hours. */
export const DISH_EFFECT_DURATION_SECONDS = 24 * 60 * 60
