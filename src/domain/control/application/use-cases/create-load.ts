import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Load } from '../../enterprise/entities/load'
import { LoadRepository } from '../repositories/load-repository'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface LoadRequest {
  type: string
  weight: number
  itemsId: string
  truckId: string
}

type LoadResponse = Either<
  null,
  {
    load: Load
  }
>

@Injectable()
export class LoadUseCase {
  constructor(private loadRepository: LoadRepository) {}

  async execute({
    type,
    weight,
    itemsId,
    truckId,
  }: LoadRequest): Promise<LoadResponse> {
    const load = Load.create({
      type,
      weight,
      itemsId: new UniqueEntityID(itemsId),
      truckId: new UniqueEntityID(truckId),
    })

    this.loadRepository.create(load)

    return right({
      load,
    })
  }
}
