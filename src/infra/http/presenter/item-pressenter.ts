import { Item } from '@/domain/control/enterprise/entities/item'

export class ItemPresenter {
  static toHTTP(item: Item) {
    return {
      id: item.id.toString(),
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      amount: item.amount,
      weight: item.weight,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }
  }
}
