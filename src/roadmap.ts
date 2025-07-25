import type { RoadmapItem } from './types/roadmap'

export const ROADMAP: RoadmapItem[] = [
  {
    id: 6,
    phase: 'Basic site enhancements',
    quarter: 'Q1 2026',
    status: 'planned',
    progress: 0,
    description: 'Allow creation of new ingredients and recipes by users.',
    milestones: [
      { task: 'Connect to Patreon', completed: false, date: 'TBD' },
      {
        task: 'Update core objects to include new fields for linking to User',
        completed: false,
        date: 'TBD',
      },
      {
        task: 'Create table? for boons, banes, to dynamically build DCs',
        completed: false,
        date: 'TBD',
      },
      {
        task: 'Users can create biomes, ingredients, & recipes if subscriber (1$)',
        completed: false,
        date: 'TBD',
      },
      { task: 'Add "Campaign" entity to db', completed: false, date: 'TBD' },
      { task: 'Create Campaign page', completed: false, date: 'TBD' },
      {
        task: 'Users can share biomes, ingredients, & recipes with campaign if subscriber (2$)',
        completed: false,
        date: 'TBD',
      },
      {
        task: 'Users can share with the public if subscriber (3$)',
        completed: false,
        date: 'TBD',
      },
    ],
    deliverables: ['Custom Core objects', 'Improved User Experience'],
  },
  {
    id: 5,
    phase: 'Basic site enhancements',
    quarter: 'Q4 2025',
    status: 'upcoming',
    progress: 0,
    description: 'Enhancements to the site to improve user experience.',
    milestones: [
      { task: 'Enhance Sidebar', completed: false, date: 'TBD' },
      { task: 'Add Vercel Metrics gathering', completed: false, date: 'TBD' },
      { task: 'Support uploading of images', completed: false, date: 'TBD' },
      {
        task: 'Improve view of ingredient card',
        completed: false,
        date: 'TBD',
      },
      {
        task: 'Improve view of biome card',
        completed: false,
        date: 'TBD',
      },
      {
        task: 'Add images to ingredients and recipes',
        completed: false,
        date: 'TBD',
      },
    ],
    deliverables: ['Site Enhancements', 'Improved User Experience'],
  },
  {
    id: 4,
    phase: 'Filtering, Sorting, & Searching',
    quarter: 'Q3 2025',
    status: 'in-progress',
    progress: 15,
    description:
      'Users can now search core features of the app, including biomes, ingredients, and recipes as well as on their characters.',
    milestones: [
      { task: 'Biomes are searchable', completed: false, date: 'TBD' },
      { task: 'Ingredients are searchable', completed: false, date: 'TBD' },
      { task: 'Recipes are searchable', completed: false, date: 'TBD' },
      {
        task: 'Character foraging log can be searched',
        completed: false,
        date: 'TBD',
      },
      {
        task: 'Character ingredients pouch can be searched',
        completed: true,
        date: 'Jul 24',
      },
      {
        task: 'Character ingredients pouch can be filtered by fields',
        completed: false,
        date: 'TBD',
      },
      {
        task: 'Character cookbook can be searched',
        completed: false,
        date: 'TBD',
      },
    ],
    deliverables: ['Market Report', 'User Personas', 'Technical Blueprint'],
  },
  {
    id: 3,
    phase: 'Basic Character actions',
    quarter: 'Q3 2025',
    status: 'in-progress',
    progress: 76,
    description: 'Core feature for the character system',
    milestones: [
      { task: 'Create Character', completed: true, date: 'Jul 23' },
      { task: 'View Character Page', completed: true, date: 'Jul 23' },
      { task: 'Characters can advance time', completed: true, date: 'Jul 23' },
      {
        task: 'Characters can forage for ingredients',
        completed: true,
        date: 'Jul 24',
      },
      {
        task: 'Characters can view their foraging log',
        completed: true,
        date: 'Jul 24',
      },
      {
        task: 'Characters can view their ingredients pouch',
        completed: true,
        date: 'Jul 24',
      },
      { task: 'Characters can add recipes', completed: false, date: 'TBD' },
      { task: 'Characters can view recipes', completed: false, date: 'TBD' },
    ],
    deliverables: ['Character Page', 'Character Creation', 'Character Actions'],
  },
  {
    id: 2,
    phase: 'Authentication',
    quarter: 'Q3 2025',
    status: 'completed',
    progress: 100,
    description: 'Integrate Google Authentication and user management',
    milestones: [
      { task: 'Auth Tables added to db', completed: true, date: 'Jul 22' },
      { task: 'Enable in Production', completed: true, date: 'Jul 25' },
    ],
    deliverables: ['User Authentication'],
  },
  {
    id: 1,
    phase: 'MVP',
    quarter: 'Q3 2025',
    status: 'completed',
    progress: 100,
    description:
      'Inital rollout of the product with seeded data and viewable content',
    milestones: [
      { task: 'Biomes', completed: true, date: 'Jul 21' },
      { task: 'Ingredients', completed: true, date: 'Jul 21' },
      { task: 'Recipes', completed: true, date: 'Jul 22' },
      { task: 'Database', completed: true, date: 'Jul 22' },
    ],
    deliverables: ['Production App'],
  },
]
