import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrderRepository } from '@/domain/control/application/repositories/order-repository'
import { Order } from '@/domain/control/enterprise/entities/order'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }

  async findById(id: string) {
    const order = this.items.find((item) => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async delete(order: Order) {
    const orderIndex = this.items.findIndex((item) => item.id === order.id)

    this.items.splice(orderIndex, 1)
  }

  async save(order: Order) {
    const itemIndex = this.items.findIndex((item) => item.id === order.id)

    this.items[itemIndex] = order
  }

  async findManyByName(name: string, { page }: PaginationParams) {
    const order = this.items
      .filter((item) => item.name.toString() === name)
      .splice((page - 1) * 20, page * 20)

    return order
  }
}
