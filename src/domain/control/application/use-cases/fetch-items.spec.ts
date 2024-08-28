import { makeItem } from 'test/factories/make-item'
import { FetchItemsUseCase } from './fetch-items'
import { InMemoryItemRepository } from 'test/repositories/in-memory-item-respoitory'

let inMemoryItemRepository: InMemoryItemRepository
let sut: FetchItemsUseCase

describe('Fetch Items recent ', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new FetchItemsUseCase(inMemoryItemRepository)
  })

  it('Should be able to fetch recent items', async () => {
    await inMemoryItemRepository.create(
      makeItem({
        name: 'Madeira',
      }),
    )
    await inMemoryItemRepository.create(
      makeItem({
        name: 'Madeira',
      }),
    )
    await inMemoryItemRepository.create(
      makeItem({
        name: 'Madeira',
      }),
    )

    const result = await sut.execute({
      name: 'Madeira',
      page: 1,
    })

    expect(result.value?.items).toHaveLength(3)
  })

  it('Should be able to fetch paginated recents answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryItemRepository.create(
        makeItem({
          name: 'Madeira',
        }),
      )
    }

    const result = await sut.execute({
      name: 'Madeira',
      page: 2,
    })

    expect(result.value?.items).toHaveLength(2)
  })
})
