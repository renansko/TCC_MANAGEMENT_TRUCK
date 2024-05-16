import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Maintainable } from "../entities/maintainable"
import { MaintainableRepository } from "../repositories/maintainable_repository"

interface TruckMaintainableRequest {
    situationId: string
    name: string
    type: string
    timeForMaintenance: number
    startDate: Date
}

export class TruckMaintainableUseCase {
    constructor(
        private maintainableRepository: MaintainableRepository
    ) {}

    async execute({
        situationId,
        name,
        type,
        timeForMaintenance,
        startDate,
    }:TruckMaintainableRequest){
        const truckMaintainables = Maintainable.create({
            situationId: new UniqueEntityID(situationId),
            name,
            type,
            timeForMaintenance,
            startDate,
        })

        this.maintainableRepository.create(truckMaintainables)

        return truckMaintainables
    }
}