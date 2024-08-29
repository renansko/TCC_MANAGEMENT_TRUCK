import { Either, right } from '@/core/either'
import { LocationTruck } from '../../enterprise/entities/value-objects/locationTruck'
import { Telemetry } from '../../enterprise/entities/telemetry'
import { TruckTelemetryRepository } from '../repositories/telemetry-repository'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateTelemetryRequest {
  truckId: string
  engineTemperature: number
  location: LocationTruck
  speed: number
  braking: number
  bends: number
  fuel: number
  ignition: boolean
}

type CreateTelemetryResponse = Either<
  null,
  {
    telemetry: Telemetry
  }
>

@Injectable()
export class CreateTelemetryUseCase {
  constructor(private truckTelemetry: TruckTelemetryRepository) {}

  async execute({
    truckId,
    engineTemperature,
    location,
    speed,
    braking,
    bends,
    fuel,
    ignition,
  }: CreateTelemetryRequest): Promise<CreateTelemetryResponse> {
    const telemetry = Telemetry.create({
      truckId: new UniqueEntityID(truckId),
      engineTemperature,
      location,
      speed,
      braking,
      bends,
      fuel,
      ignition,
    })

    this.truckTelemetry.create(telemetry)

    return right({
      telemetry,
    })
  }
}
