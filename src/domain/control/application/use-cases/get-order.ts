import { Either, left, right } from '@/core/either'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { OrderWithRelation } from '../../enterprise/entities/order-with-relation'

interface FetchOrdersUseCaseRequest {
  page: number
}

type FetchOrdersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    orders: OrderWithRelation[]
  }
>

@Injectable()
export class GetOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    page,
  }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.orderRepository.GetOrdersUseCase({
      page,
    })
    if (orders === null) {
      throw left(new ResourceNotFoundError())
    }

    return right({
      orders: Array.isArray(orders) ? orders : [orders],
    })
  }
}
