import { Order } from '@/domain/control/enterprise/entities/order'

export class OrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id.toString(),
      itemId: order.itemId,
      userId: order.userId,
      name: order.name,
      dateRequested: order.dateRequested,
      dateDelivery: order.dateDelivery,
      deliveryAddress: order.deliveryAddress,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }
  }
}
