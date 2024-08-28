import { PaginationParams } from '@/core/repositories/pagination-params'
import { ItemRepository } from '@/domain/control/application/repositories/item-repository'
import { Item } from '@/domain/control/enterprise/entities/item'

export class InMemoryItemRepository implements ItemRepository {
  public items: Item[] = []

  async create(item: Item) {
    this.items.push(item)
  }

  async findById(id: string) {
    const item = this.items.find((item) => item.id.toString() === id)

    if (!item) {
      return null
    }

    return item
  }

  async delete(itemToDelete: Item) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === itemToDelete.id,
    )

    this.items.splice(itemIndex, 1)
  }

  async findManyByName(name: string, { page }: PaginationParams) {
    const itemComment = this.items
      .filter((item) => item.name.toString() === name)
      .splice((page - 1) * 20, page * 20)

    return itemComment
  }

  async save(item: Item) {
    const itemIndex = this.items.findIndex((content) => content.id === item.id)

    this.items[itemIndex] = item
  }
}
