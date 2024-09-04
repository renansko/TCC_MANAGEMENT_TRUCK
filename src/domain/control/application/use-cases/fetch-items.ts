import { Either, right } from '@/core/either'
import { Item } from '../../enterprise/entities/item'
import { ItemRepository } from '../repositories/item-repository'
import { Injectable } from '@nestjs/common'

interface FetchItemsUseCaseRequest {
  name: string
  page: number
}

type FetchItemsUseCaseResponse = Either<
  null,
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

    return right({
      items,
    })
  }
}