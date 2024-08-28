import { Telemetry } from "../../enterprise/entities/telemetry";

export interface TruckTelemetry{
    create(telemetry: Telemetry): Promise <void>
    findById(id: string): Promise<Telemetry | null>
    delete(item: Telemetry): Promise<void>
}