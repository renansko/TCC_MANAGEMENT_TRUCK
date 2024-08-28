import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TruckRepository } from '../repositories/truck-repository'
import { Truck } from '../../enterprise/entities/truck'
import { Either, right } from '@/core/either'

interface TruckAvaiableRequest {
  name: string
  company: string
  model: string
  fuel: number
  situation: string
  orderId: string
  telemetryId: string
}

type TruckAvaiableResponse = Either<
  null,
  {
    truck: Truck
  }
>

export class TruckAvaiableUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute({
    name,
    company,
    fuel,
    model,
    situation,
    orderId,
    telemetryId,
  }: TruckAvaiableRequest): Promise<TruckAvaiableResponse> {
    const truck = Truck.create({
      name,
      company,
      fuel,
      model,
      status: true,
      orderId: new UniqueEntityID(orderId),
      situationId: new UniqueEntityID(situation),
      telemetryId: new UniqueEntityID(telemetryId),
    })

    this.truckRepository.create(truck)

    return right({
      truck,
    })
  }
}
