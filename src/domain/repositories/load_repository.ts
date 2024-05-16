import { Load } from "../entities/load";

export interface LoadRepository{
    create(load: Load): Promise <void>
}