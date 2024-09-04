import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transfer } from '../../enterprise/entities/transfer'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { TransferRepository } from '../repositories/transfer-repository'

interface TransferAvaiableRequest {
  name: string
  model: string
  placa: string
  situationId: string
  companyId: string
  orderId: string
  telemetryId: string
}

type TransferAvaiableResponse = Either<
  null,
  {
    transfer: Transfer
  }
>

@Injectable()
export class TransferAvaiableUseCase {
  constructor(private transferRepository: TransferRepository) {}

  async execute({
    name,
    companyId,
    model,
    placa,
    situationId,
    orderId,
    telemetryId,
  }: TransferAvaiableRequest): Promise<TransferAvaiableResponse> {
    const transfer = Transfer.create({
      name,
      model,
      placa,
      orderId: new UniqueEntityID(orderId),
      situationId: new UniqueEntityID(situationId),
      telemetryId: new UniqueEntityID(telemetryId),
      companyId: new UniqueEntityID(companyId),
    })

    this.transferRepository.create(transfer)

    return right({
      transfer,
    })
  }
}
