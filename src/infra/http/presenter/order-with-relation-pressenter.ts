import { OrderWithRelation } from '@/domain/control/enterprise/entities/order-with-relation'

export class OrderWithRelationPresenter {
  static toHTTP(order: OrderWithRelation) {
    return {
      id: order.id.toString(),
      itemId: order.itemId,
      userId: order.userId,
      transferId: order.transferId,
      name: order.name,
      orderNumber: order.orderNumber,
      dateRequested: order.dateRequested,
      dateDelivery: order.dateDelivery,
      deliveryAddress: order.deliveryAddress,
      outgoingAddress: order.outgoingAddress,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      item: order.itemId,
      user: order.userId,
      transfer: order.transferId,
    }
  }
}
