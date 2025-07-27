'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import { CharacterCardStat } from './character-card-stat'
import { characterCardStyles } from './utils'
import { Card } from '@/components/common'
import { LastUpdated } from '@/components/last-updated'
import type { CharacterCardProps } from './types'

export function CharacterCard({
  id,
  name,
  description,
  image,
  currentDay,
  recipes,
  commonIngredients,
  magicalIngredients,
  updatedAt,
  details = 'full',
}: Readonly<CharacterCardProps>) {
  const styles = characterCardStyles(details)
  const imgSize = details === 'full' ? 64 : 32

  const handleClick = () => {
    redirect(`/characters/${id}`)
  }

  const stats = [
    {
      label: 'recipes',
      sublabel: 'Known',
      value: recipes ?? 0,
      icon: '📜',
    },
    {
      label: 'common',
      sublabel: 'Ingredients',
      value: commonIngredients ?? 0,
      icon: '🌿',
    },
    {
      label: 'magical',
      sublabel: 'Ingredients',
      value: magicalIngredients ?? 0,
      icon: '✨',
    },
  ]

  return (
    <Card onClick={handleClick} className={styles.cardClasses}>
      <div className={styles.headerClasses}>
        {image && (
          <Image
            src={image}
            alt={name}
            width={imgSize}
            height={imgSize}
            className='rounded-full'
          />
        )}
        <div className='grid gap-1 h-8'>
          <p className={styles.nameClasses}>{name}</p>
          <span className={styles.dayClasses}>
            Day
            <p className={styles.numberClasses}>{currentDay}</p>
          </span>
        </div>
      </div>
      {details === 'full' && (
        <p className='text-text-secondary italic'>{description}</p>
      )}
      <div className={styles.statsContainerClasses}>
        {stats.map((stat, index) => (
          <CharacterCardStat
            key={index}
            icon={stat.icon}
            label={stat.label}
            sublabel={stat.sublabel}
            value={stat.value}
            details={details}
          />
        ))}
      </div>
      <LastUpdated lastUpdated={updatedAt} />
    </Card>
  )
}
