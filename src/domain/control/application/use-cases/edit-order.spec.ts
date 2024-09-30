import { makeOrder } from 'test/factories/make-order'
import { EditOrderUseCase } from './edit-order'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { makeItem } from 'test/factories/make-item'

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: EditOrderUseCase

describe('Edit Order by id', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new EditOrderUseCase(inMemoryOrderRepository)
  })

  it('Should be possible edit a order with a id', async () => {
    const itemUm = makeItem()
    const itemDois = makeItem()
    const user = makeUser()
    const newOrder = makeOrder(
      {
        itemId: itemUm.id,
        userId: user.id,
      },
      new UniqueEntityID('order-1'),
    )

    await inMemoryOrderRepository.create(newOrder)

    expect(inMemoryOrderRepository.items[0].itemId).toEqual(itemUm.id)

    await sut.execute({
      orderId: 'order-1',
      dateDelivery: new Date(),
      dateRequested: new Date(),
      deliveryAddress: 'Novo endereco',
      itemId: itemDois.id.toValue(),
      userId: user.id.toValue(),
      name: 'Novo nome',
      status: 'entregue',
    })

    expect(inMemoryOrderRepository.items[0]).toMatchObject({
      status: 'entregue',
      name: 'Novo nome',
      itemId: itemDois.id,
    })
  })
})
