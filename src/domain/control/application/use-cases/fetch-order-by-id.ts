import { Either, left, right } from '@/core/either'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderWithRelation } from '../../enterprise/entities/order-with-relation'

interface FetchOrdersUseCaseRequest {
  orderId: UniqueEntityID
}

type FetchOrdersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    orders: OrderWithRelation[]
  }
>

@Injectable()
export class FetchByIdOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    orderId,
  }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.orderRepository.findByIdWithRelation(
      orderId.toValue(),
    )
    if (orders === null) {
      console.log('cheguei')
      throw left(new ResourceNotFoundError())
    }
    return right({
      orders: [orders],
    })
  }
}
