import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TruckRepository } from '../repositories/truck-repository'
import { Truck } from '../../enterprise/entities/truck'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface TruckAvaiableRequest {
  name: string
  model: string
  situationId: string
  companyId: string
  orderId: string
  telemetryId: string
}

type TruckAvaiableResponse = Either<
  null,
  {
    truck: Truck
  }
>

@Injectable()
export class TruckAvaiableUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute({
    name,
    companyId,
    model,
    situationId,
    orderId,
    telemetryId,
  }: TruckAvaiableRequest): Promise<TruckAvaiableResponse> {
    const truck = Truck.create({
      name,
      model,
      orderId: new UniqueEntityID(orderId),
      situationId: new UniqueEntityID(situationId),
      telemetryId: new UniqueEntityID(telemetryId),
      companyId: new UniqueEntityID(companyId),
    })

    this.truckRepository.create(truck)

    return right({
      truck,
    })
  }
}
