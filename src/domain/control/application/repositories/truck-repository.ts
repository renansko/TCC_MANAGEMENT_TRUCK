import { Truck } from "../../enterprise/entities/truck";

export interface TruckRepository{
    create(truck: Truck): Promise <void>
    findById(id: string): Promise<Truck | null>
    delete(item: Truck): Promise<void>
}