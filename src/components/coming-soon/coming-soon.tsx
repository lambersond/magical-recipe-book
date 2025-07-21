'use client'

import Image from 'next/image'
import {
  BackpackIcon,
  CharacterIcon,
  CheckIcon,
  ClockIcon,
  LogBookIcon,
} from '../common/icons'
import { getStatusColor, getStatusText } from './utils'

interface UpcomingItem {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  status: 'coming-soon' | 'in-progress' | 'completed'
}

export function ComingSoon() {
  const upcomingItems: UpcomingItem[] = [
    {
      id: 1,
      title: 'Character Creation',
      description:
        'Manage your seperate characters cookbooks and recipes with ease.',
      icon: <CharacterIcon className='size-6' />,
      status: 'in-progress',
    },
    {
      id: 2,
      title: 'Foraging Log',
      description: 'Never again what you have foraged and when you did it.',
      icon: <LogBookIcon className='size-6' />,
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Ingredients Pouch',
      description:
        'Keep track of all your ingredients reguardless of if they have expired or not.',
      icon: <BackpackIcon className='size-6' />,
      status: 'coming-soon',
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': {
        return <CheckIcon className='w-5 h-5 text-green-400' />
      }
      case 'in-progress': {
        return <ClockIcon className='w-5 h-5 text-yellow-400' />
      }
      default: {
        return <ClockIcon className='w-5 h-5 text-gray-400' />
      }
    }
  }

  return (
    <div className='bg-gradient-to-br from-primary via-amber-600 to-secondary absolute top-0 min-h-screen min-w-screen overflow-scroll-y pt-20 -z-[1]'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-secondary/80 to-seconadary/20 opacity rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-primary/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      {/* Main content */}
      <div className='relative py-12 px-4 text-text-primary'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-16 animate-fade-in'>
            <div className='inline-flex items-center justify-center w-20 h-20 mb-6 animate-bounce'>
              <Image
                src='/logo.png'
                alt='Logo'
                width={80}
                height={80}
                className='rounded-full'
              />
            </div>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6'>
              Coming Soon
            </h1>
            <p className='text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed'>
              We&apos;re building something incredible. Here&apos;s what you can
              expect in the upcoming releases.
            </p>
          </div>

          {/* Features Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {upcomingItems.map((item, index) => (
              <div
                key={item.id}
                className={
                  'bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up'
                }
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-xl mb-4 mr-4 '>
                  {item.icon}
                </div>
                {/* Status Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${getStatusColor(item.status)}`}
                >
                  {getStatusIcon(item.status)}
                  {getStatusText(item.status)}
                </div>

                {/* Content */}
                <h3 className='text-xl font-bold text-white mb-3'>
                  {item.title}
                </h3>
                <p className='text-gray-300 leading-relaxed'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className='text-center mt-16 animate-fade-in'>
            <p className='text-lg'>
              In the meantime, feel free to explore the existing content by
              clicking on the{' '}
              <Image
                src={'/logo.png'}
                alt='Logo'
                width={28}
                height={28}
                className='inline-block'
              />{' '}
              icon in the top left corner.
            </p>
            <div className='mt-6 flex justify-center'>
              <div className='w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full'></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
