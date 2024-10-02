import { makeOrder } from 'test/factories/make-order'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { FetchOrdersUseCase } from './fetch-order-by-name'
let inMemoryOrderRepository: InMemoryOrderRepository
let sut: FetchOrdersUseCase

describe('Fetch Orders recent ', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new FetchOrdersUseCase(inMemoryOrderRepository)
  })

  it('Should be able to fetch recent orders', async () => {
    await inMemoryOrderRepository.create(
      makeOrder({
        name: 'Levar',
      }),
    )
    await inMemoryOrderRepository.create(
      makeOrder({
        name: 'Levar',
      }),
    )
    await inMemoryOrderRepository.create(
      makeOrder({
        name: 'Levar',
      }),
    )

    const result = await sut.execute({
      name: 'Levar',
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value?.orders).toHaveLength(3)
    }
  })

  it('Should be able to fetch paginated recents answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryOrderRepository.create(
        makeOrder({
          name: 'Madeira',
        }),
      )
    }

    const result = await sut.execute({
      name: 'Madeira',
      page: 2,
    })
    if (result.isRight()) {
      expect(result.value?.orders).toHaveLength(2)
    }
  })
})
