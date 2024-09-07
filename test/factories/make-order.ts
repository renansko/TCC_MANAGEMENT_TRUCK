import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/control/enterprise/entities/order'

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      userId: new UniqueEntityID(),
      itemId: new UniqueEntityID(),
      dateDelivery: new Date(),
      dateRequested: new Date(),
      deliveryAddress: 'Lodianopolis',
      status: 'Pronto',
      ...override,
    },
    id,
  )

  return order
}
