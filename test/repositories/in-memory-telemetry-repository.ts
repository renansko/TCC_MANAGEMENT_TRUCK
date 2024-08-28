import { TruckTelemetryRepository } from "@/domain/control/application/repositories/telemetry-repository"
import { Telemetry } from "@/domain/control/enterprise/entities/telemetry"

export class InMemoryTruckTelemetryRepository implements TruckTelemetryRepository{
    public items: Telemetry[] = []
    
    async create(trucktelemetry: Telemetry) {
        this.items.push(trucktelemetry)
    }

    async findById(id: string) {
        const trucktelemetry = this.items.find((item) => item.id.toString() === id)

        if(!trucktelemetry){
            return null
        }

        return trucktelemetry
    }

    async delete(trucktelemetry: Telemetry) {
        const trucktelemetryIndex = this.items.findIndex(
            (item) => item.id === trucktelemetry.id)

            this.items.splice(trucktelemetryIndex, 1)
    }

}