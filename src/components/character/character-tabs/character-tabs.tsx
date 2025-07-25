'use client'

import { User, LeafyGreen } from 'lucide-react'
// import { User, Book, LeafyGreen } from 'lucide-react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { CharacterForagingLog } from '../tabs/character-foraging-log'
import { CharacterIngredientsPouch } from '../tabs/character-ingredients-pouch'
import { CharacterOverview } from '../tabs/character-overview'
import { tabPanelStyles, tabStyles } from './utils'
import { PouchIcon } from '@/components/common/icons'

export function CharacterTabs() {
  return (
    <Tabs>
      <div className='bg-card border-b border-border w-full'>
        <TabList className='cursor-pointer max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center min-w-1/4 space-x-8'>
          <Tab className={`${tabStyles} sm:after:content-['Overview']`}>
            <User className='size-5 min-w-14 sm:min-w-5' />
          </Tab>
          <Tab
            className={`${tabStyles} sm:after:content-['Foraging'] md:after:content-['Foraging_Log']`}
          >
            <LeafyGreen className='size-5 min-w-14 sm:min-w-5' />
          </Tab>
          <Tab
            className={`${tabStyles} sm:after:content-['Ingredients'] md:after:content-['Ingredients_Pouch']`}
          >
            <PouchIcon className='size-5 min-w-14 sm:min-w-5' />
          </Tab>
          {/* <Tab className={`${tabStyles} sm:after:content-['Cookbook']`}>
            <Book className='size-5 min-w-14 sm:min-w-5' />
          </Tab> */}
        </TabList>
      </div>
      <TabPanel className={tabPanelStyles}>
        <CharacterOverview />
      </TabPanel>
      <TabPanel className={tabPanelStyles}>
        <CharacterForagingLog />
      </TabPanel>
      <TabPanel className={tabPanelStyles}>
        <CharacterIngredientsPouch />
      </TabPanel>
      {/* <TabPanel className={tabPanelStyles}>
        <div className='w-full'>Cookbook</div>
      </TabPanel> */}
    </Tabs>
  )
}
