/**
 * @jest-environment node
 */

import { ingredients } from './ingredients'
import { DAMAGE_TYPES } from '@/constants/dish-changes'
import {
  type IngredientChange,
  ingredientChangesSchema,
} from '@/schemas/dish-changes'

// Each change is checked against the text players read, and each clause of
// that text against the changes, so the two can't drift apart.

const ABILITY_NAMES = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma',
} as const

const SKILL_NAMES = {
  acr: 'Acrobatics',
  ani: 'Animal Handling',
  arc: 'Arcana',
  ath: 'Athletics',
  dec: 'Deception',
  his: 'History',
  ins: 'Insight',
  itm: 'Intimidation',
  inv: 'Investigation',
  med: 'Medicine',
  nat: 'Nature',
  prc: 'Perception',
  prf: 'Performance',
  per: 'Persuasion',
  rel: 'Religion',
  slt: 'Sleight of Hand',
  ste: 'Stealth',
  sur: 'Survival',
} as const

const signed = (value: number) =>
  value > 0 ? String.raw`\+${value}` : `${value}`
const escape = (text: string) => text.replaceAll(/[+()]/g, String.raw`\$&`)

/** The words in a boon or bane that a change stands for. */
function phrase(change: IngredientChange): RegExp {
  switch (change.type) {
    case 'abilityScore': {
      return new RegExp(
        String.raw`${signed(change.value)} to ${ABILITY_NAMES[change.ability]}\b`,
      )
    }
    case 'rollMode': {
      if (change.roll === 'skill') {
        return new RegExp(
          `${change.mode} on ${SKILL_NAMES[change.skill]} checks`,
          'i',
        )
      }
      const roll = change.roll === 'save' ? 'sav(es|ing throws)' : 'checks'
      return new RegExp(
        `${change.mode} on ${ABILITY_NAMES[change.ability]} ${roll}`,
        'i',
      )
    }
    case 'rollBonus': {
      const rolls = {
        attack: 'on all attack rolls',
        damage: 'on all damage rolls',
        check: 'to all ability checks',
        save: 'to all (ability checks and )?saving throws',
      }
      return new RegExp(`${signed(change.value)} ${rolls[change.roll]}`, 'i')
    }
    case 'maxHitPoints': {
      return 'roll' in change
        ? new RegExp(
            `${change.sign > 0 ? 'Gain' : 'Lose'} ${escape(change.roll)} Maximum Hit Points`,
          )
        : new RegExp(`${signed(change.value)} Maximum Hit Points`)
    }
    case 'damageResistance':
    case 'damageVulnerability': {
      const kind =
        change.type === 'damageResistance' ? 'resistance' : 'vulnerability'
      return new RegExp(
        String.raw`${kind} to ([\w ]*\b${change.damageType}\b[\w ]* damage|all damage types)`,
        'i',
      )
    }
    case 'conditionImmunity': {
      return new RegExp(`immunity to (being )?${change.condition}`, 'i')
    }
    case 'sense': {
      return new RegExp(String.raw`${change.sense} \(${change.range} ft\)`, 'i')
    }
    case 'exhaustion': {
      return new RegExp(
        `gain ${change.levels === 1 ? 'one level' : `${change.levels} levels`} of exhaustion`,
        'i',
      )
    }
  }
}

const sameChange = (a: IngredientChange, b: Partial<IngredientChange>) =>
  Object.entries(b).every(([key, value]) => (a as any)[key] === value)

const abilityKey = (name: string) =>
  Object.entries(ABILITY_NAMES).find(
    ([, full]) => full.toLowerCase() === name.toLowerCase(),
  )?.[0]

const skillKey = (name: string) =>
  Object.entries(SKILL_NAMES).find(
    ([, full]) => full.toLowerCase() === name.toLowerCase(),
  )?.[0]

/** The changes each clause of a boon or bane calls for, read from its words. */
function clauses(text: string): Partial<IngredientChange>[] {
  const found: Partial<IngredientChange>[] = []
  for (const [, value, name] of text.matchAll(
    /([+-]\d) to (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\b/g,
  )) {
    found.push({
      type: 'abilityScore',
      ability: abilityKey(name),
      value: Number(value),
    } as Partial<IngredientChange>)
  }
  for (const [, mode, name, roll] of text.matchAll(
    /\b(advantage|disadvantage) on ([a-z]+(?: of [a-z]+| [a-z]+)?) (checks|saving throws|saves)/gi,
  )) {
    const ability = abilityKey(name)
    found.push(
      (ability
        ? {
            type: 'rollMode',
            roll: roll.toLowerCase() === 'checks' ? 'check' : 'save',
            ability,
            mode: mode.toLowerCase(),
          }
        : {
            type: 'rollMode',
            roll: 'skill',
            skill: skillKey(name) ?? `unknown skill ${name}`,
            mode: mode.toLowerCase(),
          }) as Partial<IngredientChange>,
    )
  }
  for (const [, kind, types] of text.matchAll(
    /\b(resistance|vulnerability) to ([a-z ]+?) damage/gi,
  )) {
    const type =
      kind.toLowerCase() === 'resistance'
        ? 'damageResistance'
        : 'damageVulnerability'
    if (types.toLowerCase() === 'all') continue
    for (const damageType of types.split(' and ')) {
      found.push({ type, damageType } as Partial<IngredientChange>)
    }
  }
  if (/resistance to all damage types/i.test(text)) {
    for (const damageType of DAMAGE_TYPES) {
      found.push({ type: 'damageResistance', damageType })
    }
  }
  if (/vulnerability to all damage types/i.test(text)) {
    for (const damageType of DAMAGE_TYPES) {
      found.push({ type: 'damageVulnerability', damageType })
    }
  }
  for (const [, condition] of text.matchAll(/immunity to (?:being )?(\w+)/gi)) {
    found.push({
      type: 'conditionImmunity',
      condition: condition.toLowerCase(),
    } as Partial<IngredientChange>)
  }
  for (const [, range] of text.matchAll(/darkvision \((\d+) ft\)/gi)) {
    found.push({ type: 'sense', sense: 'darkvision', range: Number(range) })
  }
  return found
}

const sides = ingredients.flatMap(ingredient => [
  {
    name: ingredient.name,
    side: 'boon',
    text: ingredient.boon,
    changes: ingredient.boonChanges,
  },
  {
    name: ingredient.name,
    side: 'bane',
    text: ingredient.bane,
    changes: ingredient.baneChanges,
  },
])

describe('prisma/data/ingredients', () => {
  it.each(sides)('$name $side changes should be valid', ({ changes }) => {
    expect(changes.length).toBeGreaterThan(0)
    expect(ingredientChangesSchema.safeParse(changes).success).toBe(true)
  })

  it.each(sides)(
    '$name $side changes should each be told in its text',
    ({ text, changes }) => {
      for (const change of changes) {
        expect(text).toMatch(phrase(change))
      }
    },
  )

  it.each(sides)(
    '$name $side text should have a change for each clause',
    ({ text, changes }) => {
      for (const clause of clauses(text)) {
        expect(changes.some(change => sameChange(change, clause))).toBe(true)
      }
    },
  )

  it.each(sides)('$name $side changes should not repeat', ({ changes }) => {
    const keys = changes.map(change => JSON.stringify(change))
    expect(new Set(keys).size).toBe(keys.length)
  })
})
