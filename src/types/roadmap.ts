export type RoadmapItem = {
  id?: number
  phase: string
  quarter: string
  status: 'completed' | 'in-progress' | 'upcoming' | 'planned'
  progress: number
  description: string
  milestones: {
    task: string
    completed: boolean
    date: string
  }[]
  deliverables: string[]
}
