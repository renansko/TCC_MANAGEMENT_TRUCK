import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

interface FetchOrdersUseCaseRequest {
  name: string
  page: number
}

type FetchOrdersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    orders: Order[]
  }
>

@Injectable()
export class FetchOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    name,
    page,
  }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.orderRepository.findManyByName(name, {
      page,
    })
    if (!orders) {
      throw left(new ResourceNotFoundError())
    }

    return right({
      orders,
    })
  }
}
