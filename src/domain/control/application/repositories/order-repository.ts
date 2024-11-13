import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/order'
import { OrderWithRelation } from '../../enterprise/entities/order-with-relation'

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>
  abstract findById(id: string): Promise<Order | null>
  abstract delete(item: Order): Promise<void>
  abstract save(item: Order): Promise<void>
  abstract findByIdWithRelation(id: string): Promise<OrderWithRelation | null>
  abstract findManyByName(
    name: string,
    params: PaginationParams,
  ): Promise<Order[]>
}
