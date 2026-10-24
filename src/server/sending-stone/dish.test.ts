/**
 * @jest-environment node
 */

import { buildDish, type DishToSend } from './dish'

type Ingredient =
  DishToSend['recipe']['magicalIngredients'][number]['ingredient']

const fireberries = {
  name: 'Fireberries',
  boon: 'Gain 3+1d6 Maximum Hit Points and resistance to fire damage.',
  bane: 'Lose 3+1d6 Maximum Hit Points and vulnerability to fire damage.',
  boonChanges: [
    { type: 'maxHitPoints', roll: '3+1d6', sign: 1 },
    { type: 'damageResistance', damageType: 'fire' },
  ],
  baneChanges: [
    { type: 'maxHitPoints', roll: '3+1d6', sign: -1 },
    { type: 'damageVulnerability', damageType: 'fire' },
  ],
}

const snowmilk = {
  name: 'Snowmilk',
  boon: 'Resistance to cold damage.',
  bane: 'Vulnerability to cold damage.',
  boonChanges: [{ type: 'damageResistance', damageType: 'cold' }],
  baneChanges: [{ type: 'damageVulnerability', damageType: 'cold' }],
}

function dish(
  status: string,
  ingredients: Ingredient[] = [fireberries, snowmilk],
): DishToSend {
  return {
    id: 'dish-1',
    status,
    cookedOnDay: 3,
    consumedOnDay: 3,
    recipe: {
      name: 'Ember Stew',
      description: 'A warming stew.',
      boonText: 'The stew sings.',
      baneText: 'The stew sulks.',
      magicalIngredients: ingredients.map(ingredient => ({ ingredient })),
    },
  }
}

// Every die lands on its highest face
const highest = () => 0.999

describe('server/sending-stone/dish', () => {
  it('should send a boon with its text and every ingredient’s changes', () => {
    expect(buildDish(dish('boon'), 'Thorin', highest)).toEqual({
      version: 1,
      dish: {
        id: 'dish-1',
        recipe: 'Ember Stew',
        status: 'boon',
        outcome: 'boon',
        cookedOnDay: 3,
        consumedOnDay: 3,
      },
      cook: { name: 'Thorin' },
      message: 'The stew sings.',
      effect: {
        name: 'Ember Stew (Boon)',
        ingredients: [
          { name: 'Fireberries', text: fireberries.boon },
          { name: 'Snowmilk', text: snowmilk.boon },
        ],
        duration: { seconds: 86_400 },
        stacks: false,
        changes: [
          { type: 'maxHitPoints', value: 9, formula: '3+1d6' },
          { type: 'damageResistance', damageType: 'fire' },
          { type: 'damageResistance', damageType: 'cold' },
        ],
      },
    })
  })

  it('should send a bane, losing the hit points it rolls', () => {
    const { message, effect } = buildDish(dish('bane'), 'Thorin', () => 0)

    expect(message).toBe('The stew sulks.')
    expect(effect?.name).toBe('Ember Stew (Bane)')
    expect(effect?.ingredients).toEqual([
      { name: 'Fireberries', text: fireberries.bane },
      { name: 'Snowmilk', text: snowmilk.bane },
    ])
    expect(effect?.changes).toEqual([
      { type: 'maxHitPoints', value: -4, formula: '3+1d6' },
      { type: 'damageVulnerability', damageType: 'fire' },
      { type: 'damageVulnerability', damageType: 'cold' },
    ])
  })

  it('should roll the dice once for the dish', () => {
    const rng = jest.fn(() => 0.5)

    buildDish(dish('boon'), 'Thorin', rng)

    expect(rng).toHaveBeenCalledTimes(1)
  })

  it.each(['success', 'failure'])(
    'should send a %s as a standard dish with no effect',
    status => {
      const sent = buildDish(dish(status), 'Thorin')

      expect(sent.dish).toMatchObject({ status, outcome: 'standard' })
      expect(sent.message).toBe('A warming stew.')
      expect(sent.effect).toBeNull()
    },
  )

  it('should fall back to the description where the recipe has no boon text', () => {
    const cooked = dish('boon')
    // eslint-disable-next-line unicorn/no-null
    cooked.recipe.boonText = null

    expect(buildDish(cooked, 'Thorin').message).toBe('A warming stew.')
  })

  it('should refuse changes that aren’t valid', () => {
    const broken = { ...snowmilk, boonChanges: [{ type: 'fly' }] }

    expect(() => buildDish(dish('boon', [broken]), 'Thorin')).toThrow()
  })
})
