import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/control/enterprise/entities/order'
import { Order as PrismaOrder, Prisma } from '@prisma/client'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        itemId: new UniqueEntityID(raw.itemId),
        userId: new UniqueEntityID(raw.userId),
        dateRequested: raw.dateRequested,
        dateDelivery: raw.dateDelivery,
        deliveryAddress: raw.deliveryAddress,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      itemId: order.itemId.toValue(),
      userId: order.userId.toValue(),
      dateRequested: order.dateRequested,
      dateDelivery: order.dateDelivery,
      deliveryAddress: order.deliveryAddress,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
}
