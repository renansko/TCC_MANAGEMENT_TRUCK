import { Either, left, right } from '@/core/either'
import { Telemetry } from '../../enterprise/entities/telemetry'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TelemetryRepository } from '../repositories/telemetry-repository'
import { TransferRepository } from '../repositories/transfer-repository'
import { NotFoundError } from './errors/not-found-error'

interface CreateTelemetryRequest {
  transferId: string
  speed: number
  braking: number
  bends: number
  fuel: number
  ignition: boolean
}

type CreateTelemetryResponse = Either<
  NotFoundError,
  {
    telemetry: Telemetry
  }
>

@Injectable()
export class CreateTelemetryUseCase {
  constructor(
    private telemetryRepository: TelemetryRepository,
    private transferRepositoy: TransferRepository,
  ) {}

  async execute({
    transferId,
    speed,
    braking,
    bends,
    fuel,
    ignition,
  }: CreateTelemetryRequest): Promise<CreateTelemetryResponse> {
    const transfer = await this.transferRepositoy.findById(transferId)

    if (!transfer) {
      return left(new NotFoundError(transferId))
    }
    const telemetry = Telemetry.create({
      transferId: new UniqueEntityID(transferId),
      speed,
      braking,
      bends,
      fuel,
      ignition,
    })

    this.telemetryRepository.create(telemetry)

    return right({
      telemetry,
    })
  }
}
