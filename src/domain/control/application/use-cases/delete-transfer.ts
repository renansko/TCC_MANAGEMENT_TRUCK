import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-foud-error'
import { TransferRepository } from '../repositories/transfer-repository'
import { Injectable } from '@nestjs/common'
interface DeleteTransferRequest {
  transferId: string
}

type DeleteTransferResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteTransferUseCase {
  constructor(private transferRepository: TransferRepository) {}

  async execute({
    transferId,
  }: DeleteTransferRequest): Promise<DeleteTransferResponse> {
    const transfer = await this.transferRepository.findById(transferId)

    if (!transfer) {
      return left(new ResourceNotFoundError())
    }

    await this.transferRepository.delete(transfer)

    return right(null)
  }
}
