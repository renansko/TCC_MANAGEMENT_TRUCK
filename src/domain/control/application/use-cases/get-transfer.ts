import { Either, left, right } from '@/core/either'
import { Transfer } from '../../enterprise/entities/transfer'
import { TransferRepository } from '../repositories/transfer-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

interface FetchTransfersUseCaseRequest {
  page: number
}

type FetchTransfersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    transfers: Transfer[]
  }
>

@Injectable()
export class GetTransfersUseCase {
  constructor(private transferRepository: TransferRepository) {}

  async execute({
    page,
  }: FetchTransfersUseCaseRequest): Promise<FetchTransfersUseCaseResponse> {
    const transfers = await this.transferRepository.GetTransfersUseCase({
      page,
    })
    if (transfers === null) {
      throw left(new ResourceNotFoundError())
    }

    return right({
      transfers: [transfers],
    })
  }
}
