import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/control/enterprise/entities/order'
import { OrderWithRelation } from '@/domain/control/enterprise/entities/order-with-relation'
import { Order as PrismaOrder, Prisma } from '@prisma/client'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        itemId: new UniqueEntityID(raw.itemId),
        userId: new UniqueEntityID(raw.userId),
        orderNumber: raw.orderNumber,
        name: raw.name,
        transferId: new UniqueEntityID(raw.transferId),
        dateRequested: raw.dateRequested,
        dateDelivery: raw.dateDelivery,
        deliveryAddress: raw.deliveryAddress,
        outgoingAddress: raw.outgoingAddress,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDomainWithRelation(raw) {
    return OrderWithRelation.create(
      {
        itemId: new UniqueEntityID(raw.itemId),
        userId: new UniqueEntityID(raw.userId),
        orderNumber: raw.orderNumber,
        name: raw.name,
        transferId: new UniqueEntityID(raw.transferId),
        dateRequested: raw.dateRequested,
        dateDelivery: raw.dateDelivery,
        deliveryAddress: raw.deliveryAddress,
        outgoingAddress: raw.outgoingAddress,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        item: {
          id: raw.item.id,
          name: raw.item.name,
          description: raw.item.description,
          quantity: raw.item.quantity,
          amount: raw.item.amount,
          weight: raw.item.weight,
          createdAt: raw.item.createdAt,
          updatedAt: raw.item.updatedAt,
        },
        user: {
          id: raw.user.id,
          cpf: raw.user.cpf,
          name: raw.user.name,
          email: raw.user.email,
          password: raw.user.password,
          phone: raw.user.phone,
          birth: raw.user.birth,
          cep: raw.user.cep,
          address: raw.user.address,
          role: raw.user.role,
          companyId: raw.user.companyId,
          createdAt: raw.user.createdAt,
          updatedAt: raw.user.updatedAt,
        },
        transfer: {
          id: raw.transfer.id,
          name: raw.transfer.name,
          model: raw.transfer.model,
          plate: raw.transfer.plate,
          status: raw.transfer.status,
          companyId: raw.transfer.companyId,
          driverId: raw.transfer.driverId,
          createdAt: raw.transfer.createdAt,
          updatedAt: raw.transfer.updatedAt,
        },
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      name: order.name,
      orderNumber: order.orderNumber,
      transferId: order.transferId.toValue(),
      itemId: order.itemId.toValue(),
      userId: order.userId.toValue(),
      dateRequested: order.dateRequested,
      dateDelivery: order.dateDelivery,
      outgoingAddress: order.outgoingAddress,
      deliveryAddress: order.deliveryAddress,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
}
