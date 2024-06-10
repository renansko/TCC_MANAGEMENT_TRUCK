import { TruckRepository } from "@/domain/control/application/repositories/truck_repository"
import { Truck } from "@/domain/control/enterprise/entities/truck"

export class InMemoryTruckRepository implements TruckRepository{
    public items: Truck[] = []
    
    async create(truck: Truck) {
        this.items.push(truck)
    }

}