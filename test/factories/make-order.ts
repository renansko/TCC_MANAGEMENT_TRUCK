import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/control/enterprise/entities/order'

import { faker } from '@faker-js/faker'

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      userId: new UniqueEntityID(),
      itemId: new UniqueEntityID(),
      dateDelivery: faker.date.future(),
      dateRequested: faker.date.recent(),
      deliveryAddress: faker.location.streetAddress(),
      status: faker.word.sample(),
      ...override,
    },
    id,
  )

  return order
}
