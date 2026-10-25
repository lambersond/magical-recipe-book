import type { ModalProps } from '../types'
import type {
  BiomeForagingResult,
  CharacterMode,
  LogForagingResults,
} from '@/types'

export interface GoForagingModalProps extends Omit<ModalProps, 'onClose'> {
  characterId: string
  /** In game mode, rolls come only from the app's dice; companion otherwise */
  mode?: CharacterMode
  onSubmit(results: LogForagingResults): void
  /** Called with the updated pouch and log when foraging a biome succeeds */
  onForaged(result: BiomeForagingResult): void
}

export type ForageBiomeProps = Pick<
  GoForagingModalProps,
  'characterId' | 'mode' | 'onForaged'
> & {
  onClose(): void
}

export type SurvivalCheckProps = {
  onRolled(total: number, detail: string): void
}
