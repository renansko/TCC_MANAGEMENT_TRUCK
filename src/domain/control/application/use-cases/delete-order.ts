import { Either, left, right } from '@/core/either'
import { OrderRepository } from '../repositories/order-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-foud-error'
import { Injectable } from '@nestjs/common'

interface DeleteOrderRequest {
  orderId: string
}

type DeleteOrderResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ orderId }: DeleteOrderRequest): Promise<DeleteOrderResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    await this.orderRepository.delete(order)

    return right(null)
  }
}
