import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-foud-error'
import { ItemRepository } from '../repositories/item-repository'
import { Injectable } from '@nestjs/common'

interface DeleteItemsRequest {
  itemId: string
}

type DeleteItemsResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteItemsUseCase {
  constructor(private itemRepository: ItemRepository) {}

  async execute({ itemId }: DeleteItemsRequest): Promise<DeleteItemsResponse> {
    const items = await this.itemRepository.findById(itemId)

    if (!items) {
      return left(new ResourceNotFoundError())
    }

    await this.itemRepository.delete(items)

    return right(null)
  }
}
