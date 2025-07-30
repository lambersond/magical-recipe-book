import clsx from 'classnames'
import { RARITY_DC, RARITY_LABELS } from '@/constants/rarity'
import { useRarityIcons } from '@/hooks/use-rarity-icons'
import { getDCColor } from '@/utils/rarity'
import type { Rarity } from '@/types'

export default function MechanicsPage() {
  const rarityIcons = useRarityIcons()
  return (
    <main className='pt-8 pb-20 sm:p-20'>
      <div className='max-w-6xl mx-auto flex flex-col items-center gap-2 md:gap-4 lg:gap-6'>
        {/* Overview */}
        <div className='bg-card rounded-none sm:rounded-lg shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-secondary mb-6'>
            How It Works
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='min-w-8 size-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold'>
                  1
                </div>
                <div>
                  <h3 className='font-semibold text-text-primary'>
                    Gather Ingredients
                  </h3>
                  <p className='text-text-secondary'>
                    Collect 2 common ingredients and 1 magical component from
                    specific biomes
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='min-w-8 size-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold'>
                  2
                </div>
                <div>
                  <h3 className='font-semibold text-text-primary'>
                    Cook the Dish
                  </h3>
                  <p className='text-text-secondary'>
                    Make a skill check against the recipe&apos;s DC using
                    cooking utensils
                  </p>
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='min-w-8 size-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold'>
                  3
                </div>
                <div>
                  <h3 className='font-semibold text-text-primary'>
                    Determine Outcome
                  </h3>
                  <p className='text-text-secondary'>
                    Success grants boons, failure causes detriments
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='min-w-8 size-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold'>
                  4
                </div>
                <div>
                  <h3 className='font-semibold text-text-primary'>
                    Enjoy Effects
                  </h3>
                  <p className='text-text-secondary'>
                    All effects last for 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cooking Requirements */}
        <div className='grid lg:grid-cols-2 gap-2 md:gap-4 lg:gap-6 w-full'>
          <div className='bg-card rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold text-secondary mb-4 flex items-center'>
              <span className='mr-2'>🍳</span> Cooking Requirements
            </h2>
            <ul className='space-y-3 text-text-secondary'>
              <li className='flex items-start gap-1'>
                <span className='text-amber-500 mr-2'>•</span>
                Must have
                <strong className='text-text-primary'>cooking utensils</strong>
              </li>
              <li className='flex items-start gap-1'>
                <span className='text-amber-500 mr-2'>•</span>
                Add{' '}
                <strong className='text-text-primary'>
                  proficiency bonus
                </strong>{' '}
                if proficient with cooking utensils
              </li>
              <li className='flex items-start gap-1'>
                <span className='text-amber-500 mr-2'>•</span>
                Players must commit to eating before rolling
              </li>
              <li className='flex items-start gap-1'>
                <span className='text-amber-500 mr-2'>•</span>
                All effects last exactly{' '}
                <strong className='text-text-primary'>24 hours</strong>
              </li>
            </ul>
          </div>

          <div className='bg-card rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold text-secondary mb-4 flex items-center'>
              <span className='mr-2'>🧂</span> Infusing Items
            </h2>
            <p className='text-text-secondary mb-4'>
              Non-magical consumables can be infused with spell slots to restore
              hit points:
            </p>
            <div className='bg-paper/40 rounded-lg p-4'>
              <p className='font-semibold text-secondary mb-2'>
                Healing: 1d6+4 HP
              </p>
              <p className='font-semibold text-secondary mb-2'>
                Duration: 7 days
              </p>
              <div className='text-sm text-text-secondary space-y-1'>
                <p>2nd level: 1 item | 3rd level: 3 items</p>
                <p>4th level: 6 items | 5th level: 10 items</p>
                <p>6th level: 15 items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gathering Ingredients */}
        <div className='bg-card rounded-lg shadow-lg p-8 w-full'>
          <h2 className='text-3xl font-bold text-secondary mb-6'>
            Gathering Ingredients
          </h2>

          {/* <div className='grid lg:grid-cols-2 gap-8'> */}
          <div className='flex flex-wrap gap-8 justify-between'>
            <div className='flex-1 min-w-64'>
              <h3 className='text-xl font-semibold text-text-primary mb-4'>
                Magical Ingredients
              </h3>
              <div className='bg-paper/40 rounded-lg p-4 text-text-primary/90'>
                <p className='font-semibold mb-2'>Requirements:</p>
                <ul className='space-y-1 text-text-primary/75'>
                  <li>• Successful Survival check</li>
                  <li>• Must be in correct biome</li>
                  <li>• Magic lasts only 5 days</li>
                  <li>• +2 bonus with PC aid</li>
                  <li>• +1d4 with familiar/companion aid</li>
                </ul>
              </div>
            </div>

            <div className='flex-1'>
              <h3 className='text-xl font-semibold text-text-primary mb-4'>
                Common Ingredients
              </h3>
              <div className='bg-paper/40 rounded-lg p-4 text-text-primary min-h-[82%]'>
                <p className='font-semibold mb-2'>Requirements:</p>
                <ul className='space-y-1 text-text-primary/75'>
                  <li>• Spend 1 hour harvesting</li>
                  <li>• Roll 1d6+1 for quantity found</li>
                  <li>• Can be found in any suitable area</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <h3 className='text-xl font-semibold text-text-primary mb-4'>
              Magical Ingredient Rarities
            </h3>
            <div className='flex flex-wrap gap-4 justify-evenly'>
              {Object.entries(RARITY_LABELS).map(([key, label]) => {
                const dc = RARITY_DC[key as Rarity]
                const Icon = rarityIcons[key as Rarity]
                const classes = clsx(
                  `${getDCColor(dc)} rounded-lg p-4 text-center flex-grow`,
                )
                return (
                  <div key={key} className={classes}>
                    <Icon className='size-8 mx-auto' />
                    <h4 className='font-bold'>{label}</h4>
                    <p className='text-2xl font-bold'>DC {dc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Cooking Outcomes */}
        <div className='bg-card rounded-lg shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-secondary mb-6'>
            Cooking Outcomes
          </h2>

          <div className='grid lg:grid-cols-3 gap-6'>
            <div className='bg-red-400/10 rounded-lg p-6 border-l-4 border-red-400'>
              <h3 className='text-xl font-bold text-red-400 mb-3'>
                🔥 Disastrous
              </h3>
              <p className='text-red-500 mb-2 font-semibold'>
                Failed DC by 5 or more
              </p>
              <p className='text-red-600'>
                Causes adverse effects on all who consume the dish. The magical
                ingredient becomes corrupted, applying the inverse of its
                intended effect.
              </p>
            </div>

            <div className='bg-paper/20 rounded-lg p-6 border-l-4 border-gray-500'>
              <h3 className='text-xl font-bold text-text-secondary mb-3'>
                🍽️ Edible
              </h3>
              <p className='text-text-secondary mb-2 font-semibold'>
                Within ±4 of the DC
              </p>
              <p className='text-text-secondary'>
                The dish is edible but provides no magical benefits. It may
                taste good or bad, but has no special effects.
              </p>
            </div>

            <div className='rounded-lg p-6 border-l-4 border-green-400 text-green-400 bg-green-400/10'>
              <h3 className='text-xl font-bold mb-3'>✨ Divine</h3>
              <p className='text-green-500 mb-2 font-semibold'>
                Exceeded DC by 5 or more
              </p>
              <p className='text-green-600'>
                Grants the full intended positive effects to all who consume the
                dish. The magic works perfectly as intended.
              </p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className='bg-card border border-primary rounded-lg p-6'>
          <h2 className='text-2xl font-bold text-secondary mb-4 flex items-center'>
            <span className='mr-2'>⚠️</span> Important Notes
          </h2>
          <div className='grid md:grid-cols-2 gap-6 text-secondary'>
            <div>
              <h3 className='font-semibold mb-2'>Magical Ingredient Timing</h3>
              <p className='text-text-primary'>
                Magical ingredients lose their potency after 5 days. Plan your
                cooking accordingly!
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Corruption Effects</h3>
              <p className='text-text-primary'>
                When cooking fails dramatically, bonuses become penalties,
                resistances become vulnerabilities, and advantage becomes
                disadvantage.
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Cannot Be Infused</h3>
              <p className='text-text-primary'>
                Magical dishes cannot be further enhanced with spell slot
                infusion. Their power comes from the cooking process itself.
              </p>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Commitment Required</h3>
              <p className='text-text-primary'>
                Players must decide to eat the dish before the cooking roll is
                made. No backing out after seeing the result!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
