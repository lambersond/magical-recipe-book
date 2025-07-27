'use client'

import React, { useEffect, useRef } from 'react'
import { signIn } from 'next-auth/react'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  features: string[]
  id: string
}

const featureData = [
  {
    id: 'ingredients',
    icon: '🌿',
    title: 'Forage Magical Ingredients',
    description:
      'Collect both common and rare magical components with unique properties that shape your cooking adventures.',
    features: [
      'Magical essence with boons & banes',
      'Rarity-based ingredient system',
      'Time-sensitive freshness mechanics',
      'Strategic inventory management',
    ],
  },
  {
    id: 'recipes',
    icon: '📜',
    title: 'Master Ancient Recipes',
    description:
      'Learn and perfect mystical recipes with varying difficulty levels.',
    features: [
      'Skill-based cooking system',
      'Recipe discovery & mastery',
      'Success, failure, and critical outcomes',
      'Magical boons and dangerous banes',
      'Evolving cookbook collection',
    ],
  },
  {
    id: 'cook',
    icon: '🥘',
    title: 'Cook enchanting Dishes',
    description:
      'Craft dishes that not only satisfy hunger but also provide magical benefits.',
    features: [
      'Character customization',
      'Day-based progression system',
      'Personal foraging journals',
      'Ingredients management',
      'Recipe management',
    ],
  },
]

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  features,
  id,
}) => {
  return (
    <div
      id={id}
      className='bg-card p-8 rounded-2xl shadow-xl text-center transition-all duration-300 border border-border relative overflow-hidden group hover:bg-border hover:transform hover:-translate-y-2 hover:shadow-2xl'
    >
      <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary'></div>
      <span className='text-5xl mb-4 block'>{icon}</span>
      <h3 className='text-2xl font-semibold mb-4 text-gray-100'>{title}</h3>
      <p className='text-gray-300 leading-relaxed mb-4'>{description}</p>
      <ul className='list-none text-left mt-4 space-y-2'>
        {features.map((feature, index) => (
          <li key={index} className='py-2 pl-6 relative text-gray-400'>
            <span className='absolute left-0'>✨</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

const FloatingParticles: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createParticles = () => {
      if (!particlesRef.current) return

      const particleCount = 20
      particlesRef.current.innerHTML = ''

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className =
          'animate-float transition-all duration-500 particle'

        const size = Math.random() * 8 + 4
        particle.style.width = size + 'px'
        particle.style.height = size + 'px'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        particle.style.animationDelay = Math.random() * 6 + 's'
        particle.style.animationDuration = Math.random() * 4 + 4 + 's'

        particlesRef.current.append(particle)
      }
    }

    createParticles()
  }, [])

  return (
    <div
      ref={particlesRef}
      className='fixed top-0 left-0 inset-0 overflow-hidden -z-10 w-screen h-screen'
    />
  )
}

const signin = () => {
  signIn('google', {
    callbackUrl: '/user',
  })
}

export default function HomePage() {
  return (
    <main className='w-full max-w-6xl pt-20'>
      <section className='text-center text-white relative'>
        <FloatingParticles />
        <div className='max-w-6xl mx-auto px-5'>
          <h1 className='text-6xl font-bold mb-4 animate-fade-in-up'>
            Master Cooking while Adventuring
          </h1>
          <p className='text-xl mb-8 opacity-90 animate-fade-in-up animation-delay-200'>
            Build your character, gather magical ingredients, and cook powerful
            recipes.
          </p>
          <button
            onClick={signin}
            className='inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 animate-fade-in-up animation-delay-400'
          >
            Start your Cookbook
          </button>
        </div>
      </section>
      <section className='py-20 px-4' id='features'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
          {featureData.map(feature => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </section>
    </main>
  )
}
