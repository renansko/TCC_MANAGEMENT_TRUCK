import { Truck } from "../entities/truck";

export interface TruckRepository{
    create(truck: Truck): Promise <void>
}