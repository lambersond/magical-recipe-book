import { render } from '@testing-library/react'
import RootLayout from './layout'
import { DOM_NESTING_ERROR } from '@/utils/test-utils'

jest.mock('@/components/session-wrapper', () => ({
  SessionWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

describe('app/layout', () => {
  it('should render layout', () => {
    jest.spyOn(console, 'error').mockImplementation((msg: string) => {
      if (msg.includes(DOM_NESTING_ERROR)) return
      console.error(msg)
    })

    const { getByText, asFragment } = render(
      <RootLayout>Hello World</RootLayout>,
    )
    expect(getByText('Hello World')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
