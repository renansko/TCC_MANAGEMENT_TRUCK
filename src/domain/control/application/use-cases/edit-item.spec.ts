import { makeItem } from 'test/factories/make-item'
import { EditItemUseCase } from './edit-item'
import { InMemoryItemRepository } from 'test/repositories/in-memory-item-respository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

let inMemoryItemRepository: InMemoryItemRepository
let sut: EditItemUseCase

describe('Edit Item by id', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new EditItemUseCase(inMemoryItemRepository)
  })

  it('Should be possible edit a item with a id', async () => {
    const newItem = makeItem({
      name: 'Madeira',
    })

    await inMemoryItemRepository.create(newItem)

    await sut.execute({
      itemId: newItem.id.toValue(),
      amount: 500,
      description: 'Madeirinha',
      name: 'madeira',
      quantity: 10,
    })

    expect(inMemoryItemRepository.items[0]).toMatchObject({
      amount: 500,
      quantity: 10,
    })
  })

  it('Should not be possible edit a item when this item not exist', async () => {
    const newItem = makeItem({
      name: 'Madeira',
    })

    inMemoryItemRepository.create(newItem)

    const result = await sut.execute({
      itemId: '1',
      amount: 12,
      description: 'Madeira',
      name: 'Mesa',
      quantity: 12,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
