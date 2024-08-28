import { Either, left, right } from '@/core/either'
import { Item } from '../../enterprise/entities/item'
import { ItemRepository } from '../repositories/item-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

interface EditItemUseCaseRequest {
  itemId: string
  name: string
  description: string
  quantity: number
  type: string
  amount: number
}

type EditItemUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    item: Item
  }
>

export class EditItemUseCase {
  constructor(private itemRepository: ItemRepository) {}

  async execute({
    name,
    description,
    quantity,
    type,
    itemId,
    amount,
  }: EditItemUseCaseRequest): Promise<EditItemUseCaseResponse> {
    const item = await this.itemRepository.findById(itemId)

    if (!item) {
      return left(new ResourceNotFoundError())
    }

    item.amount = amount
    item.description = description
    item.name = name
    item.quantity = quantity
    item.type = type

    await this.itemRepository.save(item)

    return right({
      item,
    })
  }
}
