import { Either, left, right } from '@/core/either'
import { Transfer } from '../../enterprise/entities/transfer'
import { TransferRepository } from '../repositories/transfer-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { Injectable } from '@nestjs/common'
import { TransferAttachmentRepository } from '../repositories/transfer-attachment-repository'
import { TransferAttachmentList } from '../../enterprise/entities/transfer-attachment-list'
import { TransferAttachment } from '../../enterprise/entities/transfer-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface EditTransferUseCaseRequest {
  transferId: string
  name: string
  model: string
  plate: string
  attachments: string[]
  companyId: string
  driverId?: string
}

type EditTransferUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    transfer: Transfer
  }
>

@Injectable()
export class EditTransferUseCase {
  constructor(
    private transferRepository: TransferRepository,
    private transferAttachmentRepository: TransferAttachmentRepository,
  ) {}

  async execute({
    transferId,
    name,
    model,
    plate,
    attachments,
    companyId,
    driverId,
  }: EditTransferUseCaseRequest): Promise<EditTransferUseCaseResponse> {
    const transfer = await this.transferRepository.findById(transferId)
    if (!transfer) {
      return left(new ResourceNotFoundError())
    }

    if (companyId !== transfer.companyId.toString()) {
      return left(new NotAllowedError())
    }

    const currentTransferAttachments =
      this.transferAttachmentRepository.findManyByTransferId(transferId)

    const transferAttachmentList = new TransferAttachmentList(
      await currentTransferAttachments,
    )

    const transferAttachment = attachments.map((attachmentId) => {
      return TransferAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        transferId: new UniqueEntityID(transferId),
      })
    })

    transferAttachmentList.update(transferAttachment)

    transfer.attachments = transferAttachmentList
    transfer.name = name
    transfer.model = model
    transfer.plate = plate
    transfer.companyId = new UniqueEntityID(companyId)
    transfer.driverId = driverId ? new UniqueEntityID(driverId) : null
    await this.transferRepository.save(transfer)

    return right({
      transfer,
    })
  }
}
