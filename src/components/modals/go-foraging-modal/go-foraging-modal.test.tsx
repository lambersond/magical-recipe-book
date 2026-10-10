import { mockManyFetch, screen, useUser } from '@test-utils'
import { GoForagingModal } from './go-foraging-modal'
import { ModalProvider } from '@/components/modals/modal-provider'

function setup() {
  mockManyFetch([
    { responseData: [{ id: 'sugar', name: 'Ash Sugar' }] },
    { responseData: [] },
  ])
  return useUser(
    <GoForagingModal
      open
      characterId='character-1'
      onSubmit={jest.fn()}
      onForaged={jest.fn()}
    />,
    { wrapper: ModalProvider },
  )
}

describe('components/modals/go-foraging-modal', () => {
  it('should forage a biome by default for magical ingredients', () => {
    setup()

    expect(screen.getByRole('button', { name: 'Forage' })).toBeInTheDocument()
    expect(screen.getByText('Survival check')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Log Results' }),
    ).not.toBeInTheDocument()
  })

  it('should keep picking an ingredient as the other magical option', async () => {
    const { user } = setup()

    await user.click(screen.getByRole('button', { name: 'Pick ingredient' }))

    expect(screen.getByText('Ingredient Foraged')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Log Results' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Survival check')).not.toBeInTheDocument()
  })
})
