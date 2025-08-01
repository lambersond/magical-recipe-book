export function getMasonryBreakpoints(count: number): Record<string, number> {
  if (count < 2) {
    return { default: 1 }
  }
  if (count < 3) {
    return {
      default: 2,
      768: 1,
    }
  }
  if (count < 4) {
    return {
      default: 3,
      1024: 2,
      768: 1,
    }
  }
  return {
    default: 4,
    1280: 3,
    1024: 2,
    768: 1,
  }
}
