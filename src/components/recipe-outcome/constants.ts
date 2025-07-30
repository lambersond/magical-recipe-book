export const outcomes = {
  success: {
    key: 'boon',
    title: 'Devine Success',
    containerClasses:
      'border-l-4 border-success px-4 py-2 bg-success/4 rounded-r-xl',
    titleClasses: 'text-lg font-semibold text-success',
    emoji: '✨',
    flavorTextClasses: 'text-left text-sm text-green-300 mb-2',
    ingredientContainerClasses: 'text-sm text-green-300 flex items-start gap-1',
    ingredientNameClasses: 'font-semibold text-success',
  },
  failure: {
    key: 'bane',
    title: 'Disastrous Failure',
    containerClasses:
      'border-l-4 border-danger px-4 py-2 bg-danger/6 rounded-r-xl',
    titleClasses: 'text-lg font-semibold text-danger',
    emoji: '💀',
    flavorTextClasses: 'text-left text-sm text-red-300 mb-2',
    ingredientContainerClasses: 'text-sm text-red-300 flex items-start gap-1',
    ingredientNameClasses: 'font-semibold text-danger',
  },
} as const
