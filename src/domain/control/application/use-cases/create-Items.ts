import { Either, right } from '@/core/either'
import { Item } from '../../enterprise/entities/item'
import { ItemRepository } from '../repositories/item-repository'
import { Injectable } from '@nestjs/common'

interface ItemsToLoadRequest {
  name: string
  description: string
  quantity: number
  amount: number
  weight: number
}

type ItemsToLoadResposne = Either<
  null,
  {
    item: Item
  }
>

@Injectable()
export class CreateItemsUseCase {
  constructor(private itemsRepository: ItemRepository) {}

  async execute({
    weight,
    name,
    description,
    quantity,
    amount,
  }: ItemsToLoadRequest): Promise<ItemsToLoadResposne> {
    const item = Item.create({
      weight,
      name,
      description,
      quantity,
      amount,
    })

    this.itemsRepository.create(item)

    return right({
      item,
    })
  }
}
