import { Either, left, right } from '@/core/either'
import { Item } from '../../enterprise/entities/item'
import { ItemRepository } from '../repositories/item-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

interface FetchItemsUseCaseRequest {
  name: string
  page: number
}

type FetchItemsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    items: Item[]
  }
>

@Injectable()
export class FetchItemsUseCase {
  constructor(private itemRepository: ItemRepository) {}

  async execute({
    name,
    page,
  }: FetchItemsUseCaseRequest): Promise<FetchItemsUseCaseResponse> {
    const items = await this.itemRepository.findManyByName(name, {
      page,
    })

    if (!items) {
      return left(new ResourceNotFoundError())
    }

    return right({
      items,
    })
  }
}
