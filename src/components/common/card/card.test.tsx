import { render, screen, useClick } from '@test-utils'
import { Card } from './card'

describe('components/common/card', () => {
  it('should match snapshot for clickable card', () => {
    expect(
      render(<Card onClick={jest.fn}>Hello World</Card>).asFragment(),
    ).toMatchSnapshot()
  })

  it('should match snapshot for basic card', () => {
    expect(render(<Card>Hello World</Card>).asFragment()).toMatchSnapshot()
  })

  it('should call onClick when clicked', async () => {
    const onClick = jest.fn()
    const click = useClick(<Card onClick={onClick}>Hello World</Card>)

    await click(screen.getByText('Hello World'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
