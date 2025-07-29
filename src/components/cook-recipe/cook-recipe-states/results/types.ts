export interface CookingResult {
  emoji: string
  type: 'success' | 'failure'
  text: string
  flavorText: 'boonText' | 'baneText'
  unlocksMagicModifiers: boolean
}
