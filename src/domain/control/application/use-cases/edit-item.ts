import { Either, left, right } from '@/core/either'
import { Item } from '../../enterprise/entities/item'
import { ItemRepository } from '../repositories/item-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { Injectable } from '@nestjs/common'

interface EditItemUseCaseRequest {
  itemId: string
  name: string
  description: string
  quantity: number
  amount: number
  weight: number
}

type EditItemUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    item: Item
  }
>

@Injectable()
export class EditItemUseCase {
  constructor(private itemRepository: ItemRepository) {}

  async execute({
    itemId,
    name,
    description,
    quantity,
    amount,
    weight,
  }: EditItemUseCaseRequest): Promise<EditItemUseCaseResponse> {
    const item = await this.itemRepository.findById(itemId)

    if (!item) {
      return left(new ResourceNotFoundError())
    }

    item.amount = amount
    item.description = description
    item.name = name
    item.quantity = quantity
    item.weight = weight

    await this.itemRepository.save(item)

    return right({
      item,
    })
  }
}
