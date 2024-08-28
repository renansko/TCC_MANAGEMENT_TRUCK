import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderRepository } from '../repositories/order-repository'
import { Order } from '../../enterprise/entities/order'
import { Either, right } from '@/core/either'

interface CreateOrderRequest {
  loadId: string
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
    loadId,
    userId,
    dateDelivery,
    dateRequested,
    deliveryAddress,
    status,
  }: CreateOrderRequest): Promise<CreateOrderResponse> {
    const order = Order.create({
      loadId: new UniqueEntityID(loadId),
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
