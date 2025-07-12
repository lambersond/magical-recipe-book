import { AddIcon } from '../../icons'
import { IconButton } from './icon-button'
import { isPrimaryColor, isSecondaryColor, isTertiaryColor } from './utils'
import { useUser } from '@/utils/test-utils'

describe('components/common/buttons/icon-button', () => {
  it('should return if primary color', () => {
    expect(isPrimaryColor('primary')).toBe(true)
    expect(isPrimaryColor('secondary')).toBe(false)
    expect(isPrimaryColor()).toBe(false)
  })

  it('should return if secondary color', () => {
    expect(isSecondaryColor('secondary')).toBe(true)
    expect(isSecondaryColor('primary')).toBe(false)
    expect(isSecondaryColor()).toBe(false)
  })

  it('should return if tertiary color', () => {
    expect(isTertiaryColor('tertiary')).toBe(true)
    expect(isTertiaryColor('primary')).toBe(false)
  })

  it('should return if small size', () => {
    expect(isPrimaryColor('sm')).toBe(false)
    expect(isSecondaryColor('sm')).toBe(false)
  })

  it('should return if medium size', () => {
    expect(isPrimaryColor('md')).toBe(false)
    expect(isSecondaryColor('md')).toBe(false)
  })

  it('should return if large size', () => {
    expect(isPrimaryColor('lg')).toBe(false)
    expect(isSecondaryColor('lg')).toBe(false)
  })

  it('should call onClick when button is clicked', async () => {
    const onClick = jest.fn()

    const { getByTestId, user } = useUser(
      <IconButton Icon={AddIcon} onClick={onClick} />,
    )

    await user.click(getByTestId('AddIcon'))

    expect(onClick).toHaveBeenCalled()
  })
})
