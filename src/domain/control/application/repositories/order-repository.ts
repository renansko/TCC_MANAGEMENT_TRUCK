import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/order'

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>
  abstract findById(id: string): Promise<Order | null>
  abstract delete(item: Order): Promise<void>
  abstract save(item: Order): Promise<void>
  abstract findManyByName(
    name: string,
    params: PaginationParams,
  ): Promise<Order[]>
}
