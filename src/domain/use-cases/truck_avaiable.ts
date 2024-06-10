import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Truck } from "../control/enterprise/entities/truck";
import { TruckRepository } from "../control/application/repositories/truck_repository";

interface TruckLoadedRequest {
    name: string
    company: string
    model: string
    fuel: number
    situation: string
    orderId: string
}

export class TruckLoadedUseCase {
    constructor(
        private truckRepository: TruckRepository
    ) {}

    async execute({
        name,
        company,
        fuel,
        model,
        situation,
        orderId
    }:TruckLoadedRequest ){
        const truck = Truck.create({
            name,
            company,
            fuel,
            model,
            status: true,
            orderId: new UniqueEntityID(orderId),
            situationId: new UniqueEntityID(situation), 
        })

        this.truckRepository.create(truck)

        return truck
    }
}