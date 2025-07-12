import { render } from '@test-utils'
import { CircularLoader } from './circular'

describe('components/common/loaders/circular', () => {
  it('should render', () => {
    expect(render(<CircularLoader />).asFragment()).toMatchSnapshot()
  })
})
