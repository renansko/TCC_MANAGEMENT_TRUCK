import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderRepository } from '../repositories/order-repository'
import { Order } from '../../enterprise/entities/order'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface CreateOrderRequest {
  itemId: string
  userId: string
  dateRequested: Date
  dateDelivery: Date
  deliveryAddress: string
  status: string
}

type CreateOrderResponse = Either<
  null,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    itemId,
    userId,
    dateDelivery,
    dateRequested,
    deliveryAddress,
    status,
  }: CreateOrderRequest): Promise<CreateOrderResponse> {
    const order = Order.create({
      itemId: new UniqueEntityID(itemId),
      userId: new UniqueEntityID(userId),
      dateRequested,
      dateDelivery,
      deliveryAddress,
      status,
    })

    this.orderRepository.create(order)

    return right({
      order,
    })
  }
}
