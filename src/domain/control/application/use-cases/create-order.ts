import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderRepository } from '../repositories/order-repository'
import { Order } from '../../enterprise/entities/order'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user-repository'
import { ItemRepository } from '../repositories/item-repository'
import { NotFoundError } from './errors/not-found-error'

interface CreateOrderRequest {
  itemId: string
  userId: string
  dateRequested: Date
  dateDelivery: Date
  deliveryAddress: string
  status: string
}

type CreateOrderResponse = Either<
  NotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private itemRepository: ItemRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    itemId,
    userId,
    dateDelivery,
    dateRequested,
    deliveryAddress,
    status,
  }: CreateOrderRequest): Promise<CreateOrderResponse> {
    const item = await this.itemRepository.findById(itemId)
    if (!item) {
      return left(new NotFoundError(itemId))
    }

    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new NotFoundError(userId))
    }

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
