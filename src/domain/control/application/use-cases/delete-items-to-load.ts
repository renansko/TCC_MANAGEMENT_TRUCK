import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-foud-error'
import { ItemRepository } from '../repositories/item-repository'

interface DeleteItemsRequest {
  itemsId: string
}

type DeleteItemsResponse = Either<ResourceNotFoundError, null>

export class DeleteItemsUseCase {
  constructor(private itemRepository: ItemRepository) {}

  async execute({ itemsId }: DeleteItemsRequest): Promise<DeleteItemsResponse> {
    const items = await this.itemRepository.findById(itemsId)

    if (!items) {
      return left(new ResourceNotFoundError())
    }

    await this.itemRepository.delete(items)

    return right(null)
  }
}
