import { render } from '@test-utils'
import MechanicsPage from './page'

describe('app/mechanics/page', () => {
  it('should match snapshot', () => {
    expect(render(<MechanicsPage />).asFragment()).toMatchSnapshot()
  })
})
