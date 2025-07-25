import { Card, Timeline } from '@/components/common'
import { RoadmapItem, RoadmapStatuses } from '@/components/roadmap'
import { ROADMAP } from '@/roadmap'
import { pageMain } from '@/utils/styles'

export default function RoadmapPage() {
  const statuses = { completed: 0, inProgress: 0, upcoming: 0, planned: 0 }

  for (const phase of ROADMAP) {
    switch (phase.status) {
      case 'completed': {
        statuses.completed += 1
        break
      }
      case 'in-progress': {
        statuses.inProgress += 1
        break
      }
      case 'upcoming': {
        statuses.upcoming += 1
        break
      }
      case 'planned': {
        {
          statuses.planned += 1
          // No default
        }
        break
      }
    }
  }

  return (
    <main className={pageMain}>
      <Card>
        <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
          Adventurer&apos;s Cookbook Roadmap
        </h1>
        <p className='text-text-secondary text-lg'>
          The roadmap outlines upcoming new abilities, features, and
          improvements
        </p>
      </Card>

      <RoadmapStatuses
        completed={statuses.completed}
        inProgress={statuses.inProgress}
        upcoming={statuses.upcoming}
        planned={statuses.planned}
      />
      <Timeline className='w-full mb-12 pl-1 sm:pl-0'>
        {ROADMAP.map(phase => (
          <RoadmapItem
            key={phase.id}
            phase={phase.phase}
            quarter={phase.quarter}
            status={phase.status}
            progress={phase.progress}
            description={phase.description}
            milestones={phase.milestones}
            deliverables={phase.deliverables}
          />
        ))}
      </Timeline>
    </main>
  )
}
