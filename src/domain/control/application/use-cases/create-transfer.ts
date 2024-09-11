import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transfer } from '../../enterprise/entities/transfer'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { TransferRepository } from '../repositories/transfer-repository'
import { TransferAttachment } from '../../enterprise/entities/transfer-attachment'
import { TransferAttachmentList } from '../../enterprise/entities/transfer-attachment-list'
import { PlateAlreadyExistsError } from './errors/plate-already-exists-error'
import { CompanyNotExistsError } from './errors/company-not-exists-error'
import { CompanyRepository } from '../repositories/company-repository'

interface TransferAvaiableRequest {
  name: string
  model: string
  plate: string
  attachmentIds: string[]
  companyId: string
}

type TransferAvaiableResponse = Either<
  PlateAlreadyExistsError | CompanyNotExistsError,
  {
    transfer: Transfer
  }
>

@Injectable()
export class CreateTransferUseCase {
  constructor(
    private transferRepository: TransferRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async execute({
    name,
    companyId,
    model,
    plate,
    attachmentIds,
  }: TransferAvaiableRequest): Promise<TransferAvaiableResponse> {
    const transferWithSamePlate =
      await this.transferRepository.findByPlate(plate)

    if (transferWithSamePlate) {
      return left(new PlateAlreadyExistsError(plate))
    }

    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      return left(new CompanyNotExistsError(companyId))
    }

    const transfer = Transfer.create({
      name,
      model,
      plate,
      companyId: new UniqueEntityID(companyId),
    })

    const transferAttachment = attachmentIds.map((attachmentId) => {
      return TransferAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        transferId: transfer.id,
      })
    })

    transfer.attachments = new TransferAttachmentList(transferAttachment)

    await this.transferRepository.create(transfer)

    return right({
      transfer,
    })
  }
}
