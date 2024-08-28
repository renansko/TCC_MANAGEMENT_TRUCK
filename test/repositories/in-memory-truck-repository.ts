import { TruckRepository } from "@/domain/control/application/repositories/truck-repository"
import { Truck } from "@/domain/control/enterprise/entities/truck"

export class InMemoryTruckRepository implements TruckRepository{
    public items: Truck[] = []
    
    async create(truck: Truck) {
        this.items.push(truck)
    }

    async findById(id: string) {
        const truck = this.items.find((item) => item.id.toString() === id)

        if(!truck){
            return null
        }

        return truck
    }

    async delete(truck: Truck) {
        const truckIndex = this.items.findIndex(
            (item) => item.id === truck.id)

            this.items.splice(truckIndex, 1)
    }

}