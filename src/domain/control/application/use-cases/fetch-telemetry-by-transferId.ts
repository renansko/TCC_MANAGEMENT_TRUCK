import { Either, left, right } from '@/core/either'
import { Telemetry } from '../../enterprise/entities/telemetry'
import { TelemetryRepository } from '../repositories/telemetry-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface FetchTelemetrysUseCaseRequest {
  transferId: UniqueEntityID
}

type FetchTelemetrysUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    telemetrys: Telemetry[]
  }
>

@Injectable()
export class FetchTelemetryByTransferIdUseCase {
  constructor(private telemetryRepository: TelemetryRepository) {}

  async execute({
    transferId,
  }: FetchTelemetrysUseCaseRequest): Promise<FetchTelemetrysUseCaseResponse> {
    const telemetrys = await this.telemetryRepository.findByTruckId(
      transferId.toValue(),
    )

    if (!telemetrys) {
      throw left(new ResourceNotFoundError())
    }

    return right({
      telemetrys,
    })
  }
}
