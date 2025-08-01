export function getMasonryBreakpoints(count: number): Record<string, number> {
  if (count < 1) {
    return { default: 1 }
  }
  if (count < 2) {
    return { default: 2, 1024: 1 }
  }
  return { default: 3, 1536: 2, 1024: 1 }
}
