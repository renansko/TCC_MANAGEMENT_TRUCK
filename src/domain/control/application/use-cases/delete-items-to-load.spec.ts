import { InMemoryItemRepository } from 'test/repositories/in-memory-item-respository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-foud-error'
import { DeleteItemsUseCase } from './delete-items-to-load'
import { makeItem } from 'test/factories/make-item'

let inMemoryItemRepository: InMemoryItemRepository
let sut: DeleteItemsUseCase

describe('Create Item', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new DeleteItemsUseCase(inMemoryItemRepository)
  })

  it('Should be able delete an item', async () => {
    const newItem = makeItem()

    await inMemoryItemRepository.create(newItem)

    await sut.execute({
      itemsId: newItem.id.toString(),
    })

    expect(inMemoryItemRepository.items).toHaveLength(0)
  })

  it('Not should be able delete an inexistent item', async () => {
    const newItem = makeItem()

    await inMemoryItemRepository.create(newItem)

    const result = await sut.execute({
      itemsId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
