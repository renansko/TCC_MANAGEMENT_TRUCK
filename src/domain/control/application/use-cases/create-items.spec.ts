import { ItemsToLoadUseCase } from './create-Items'
import { InMemoryItemRepository } from 'test/repositories/in-memory-item-respository'

let inMemoryItemRepository: InMemoryItemRepository
let sut: ItemsToLoadUseCase

describe('Create Items', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new ItemsToLoadUseCase(inMemoryItemRepository)
  })

  it('should be able to create items for load', async () => {
    const result = await sut.execute({
      name: 'eucalipto',
      amount: 49.2,
      description: 'Madeira exportada e condensada',
      quantity: 100,
    })

    expect(result.value?.item.quantity).toEqual(100)
  })
})
