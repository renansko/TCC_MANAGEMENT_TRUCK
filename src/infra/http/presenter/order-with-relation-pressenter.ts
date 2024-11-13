import { OrderWithRelation } from '@/domain/control/enterprise/entities/order-with-relation'

export class OrderWithRelationPresenter {
  static toHTTP(order: OrderWithRelation) {
    return {
      id: order.id.toString(),
      name: order.name,
      orderNumber: order.orderNumber,
      dateRequested: order.dateRequested,
      dateDelivery: order.dateDelivery,
      deliveryAddress: order.deliveryAddress,
      outgoingAddress: order.outgoingAddress,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      requerente: order.user?.name,
      requerente_email: order.user?.email,
      requerente_phone: order.user?.phone,
      requerente_role: order.user?.role,
      requerente_birth: order.user?.birth,
      item_nome: order.item?.name,
      item_amount: order.item?.amount,
      item_description: order.item?.description,
      item_quantity: order.item?.quantity,
      item_weight: order.item?.weight,
      transfer_name: order.transfer?.name,
      transfer_model: order.transfer?.model,
      transfer_plate: order.transfer?.plate,
      transfer_status: order.transfer?.status,
      transfer_motorista_id: order.transfer?.driverId,
    }
  }
}
