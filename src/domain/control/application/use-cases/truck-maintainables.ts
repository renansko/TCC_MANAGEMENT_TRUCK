import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Maintainable } from "../../enterprise/entities/maintainable"
import { MaintainableRepository } from "../repositories/maintainable_repository"
import { Either, right } from "@/core/either"

interface TruckMaintainableRequest {
    situationId: string
    name: string
    type: string
    timeForMaintenance: number
    startDate: Date
}

type TruckMaintainableResponse = Either<
null,
    {
        maintainable: Maintainable
    }   
>

export class TruckItensMaintainableUseCase {
    constructor(
        private maintainableRepository: MaintainableRepository
    ) {}

    async execute({
        situationId,
        name,
        type,
        timeForMaintenance,
        startDate,
    }:TruckMaintainableRequest): Promise<TruckMaintainableResponse>{
        const maintainable = Maintainable.create({
            situationId: new UniqueEntityID(situationId),
            name,
            type,
            timeForMaintenance,
            startDate,
        })

        this.maintainableRepository.create(maintainable)

        return right({
            maintainable
        })
    }
}