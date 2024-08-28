import { Load } from "../../enterprise/entities/load";

export interface LoadRepository{
    create(load: Load): Promise <void>
    findById(id: string): Promise<Load | null>
    delete(item: Load): Promise<void>
}