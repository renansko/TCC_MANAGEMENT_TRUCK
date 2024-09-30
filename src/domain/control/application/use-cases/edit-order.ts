import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface EditOrderUseCaseRequest {
  orderId: string
  name: string
  itemId: string
  userId: string
  dateRequested: Date
  dateDelivery: Date
  deliveryAddress: string
  status: string
}

type EditOrderUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class EditOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
    itemId,
    userId,
    name,
    dateDelivery,
    dateRequested,
    status,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    order.itemId = new UniqueEntityID(itemId)
    order.userId = new UniqueEntityID(userId)
    order.dateDelivery = dateDelivery
    order.dateRequested = dateRequested
    order.status = status
    order.name = name

    await this.orderRepository.save(order)

    return right({
      order,
    })
  }
}
