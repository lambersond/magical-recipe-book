export function isPrimaryColor(color: string = ''): color is 'primary' {
  return color === 'primary'
}

export function isSecondaryColor(color: string = ''): color is 'secondary' {
  return color === 'secondary'
}

export function isTertiaryColor(color: string = ''): color is 'tertiary' {
  return color === 'tertiary'
}

export function isTransparentColor(color: string = ''): color is 'transparent' {
  return color === 'transparent'
}
