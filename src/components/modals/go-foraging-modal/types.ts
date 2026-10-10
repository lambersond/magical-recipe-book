import type { ModalProps } from '../types'
import type { BiomeForagingResult, LogForagingResults } from '@/types'

export interface GoForagingModalProps extends Omit<ModalProps, 'onClose'> {
  characterId: string
  onSubmit(results: LogForagingResults): void
  /** Called with the updated pouch and log when foraging a biome succeeds */
  onForaged(result: BiomeForagingResult): void
}

export type ForageBiomeProps = Pick<
  GoForagingModalProps,
  'characterId' | 'onForaged'
> & {
  onClose(): void
}

export type SurvivalCheckProps = {
  onRolled(total: number, detail: string): void
}
