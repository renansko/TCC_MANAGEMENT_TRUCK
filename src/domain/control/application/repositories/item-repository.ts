import { PaginationParams } from '@/core/repositories/pagination-params'
import { Item } from '../../enterprise/entities/item'

export abstract class ItemRepository {
  abstract create(item: Item): Promise<void>
  abstract findById(id: string): Promise<Item | null>
  abstract delete(item: Item): Promise<void>
  abstract save(item: Item): Promise<void>
  abstract findManyByName(
    name: string,
    params: PaginationParams,
  ): Promise<Item[]>
}
