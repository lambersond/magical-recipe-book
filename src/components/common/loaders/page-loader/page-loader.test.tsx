import { render } from '@test-utils'
import { PageLoader } from './page-loader'

describe('components/common/loaders/page-loader', () => {
  it('should match snapshot', () => {
    expect(render(<PageLoader />).asFragment()).toMatchSnapshot()
  })
})
