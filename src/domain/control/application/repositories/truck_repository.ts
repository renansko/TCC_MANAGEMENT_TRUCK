import { Truck } from "../../enterprise/entities/truck";

export interface TruckRepository{
    create(truck: Truck): Promise <void>
}