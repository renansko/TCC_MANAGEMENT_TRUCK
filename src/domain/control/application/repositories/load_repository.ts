import { Load } from "../../enterprise/entities/load";

export interface LoadRepository{
    create(load: Load): Promise <void>
}