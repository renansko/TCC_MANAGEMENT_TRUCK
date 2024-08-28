import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Truck } from "../../enterprise/entities/truck";
import { Either, right } from "@/core/either";
import { LocationTruck } from "../../enterprise/entities/value-objects/locationTruck";
import { Telemetry } from "../../enterprise/entities/telemetry";
import { TruckTelemetryRepository } from "../repositories/telemetry-repository";

interface CreateTelemetryRequest {
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

export class CreateTelemetryUseCase {
    constructor(
        private truckTelemetry: TruckTelemetryRepository
    ) {}

    async execute({
        engineTemperature,
        location,
        speed,
        braking,
        bends,
        fuel,
        ignition
    }:CreateTelemetryRequest ): Promise<CreateTelemetryResponse>{
        const telemetry = Telemetry.create({
            engineTemperature,
            location,
            speed,
            braking,
            bends,
            fuel,
            ignition
        })

        this.truckTelemetry.create(telemetry)

        return right({
            telemetry
        })
    }
}