'use client'

import Image from 'next/image'
import { Sidebar } from '../common'
import { MenuSidebarLink } from './menu-sidebar-link'

export function MenuSidebar() {
  return (
    <Sidebar
      trigger={
        <Image
          width={40}
          height={40}
          src='/logo.png'
          alt='Menu'
          className='cursor-pointer'
        />
      }
      className='w-full sm:w-sm bg-linear-42/oklch from-primary from-17% to-page z-[50]'
    >
      <p className='sm:hidden text-2xl italic w-full text-center pt-4'>
        The Adventurer&apos;s Cookbook
      </p>
      <div className='flex flex-col gap-2 pt-2 pr-2'>
        <MenuSidebarLink
          href='/mechanics'
          imgSrc='/mechanics.png'
          altText='Mechanics'
          text='Mechanics'
        />
        <MenuSidebarLink
          href='/recipes'
          imgSrc='/recipes.png'
          altText='Recipes'
          text='Recipes'
        />
        <MenuSidebarLink
          href='/ingredients'
          imgSrc='/ingredients.jpg'
          altText='Ingredients'
          text='Ingredients'
        />
        <MenuSidebarLink
          href='/biomes'
          imgSrc='/biomes.png'
          altText='Biomes'
          text='Biomes'
        />
      </div>
    </Sidebar>
  )
}
