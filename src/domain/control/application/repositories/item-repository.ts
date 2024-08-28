import { PaginationParams } from "@/core/repositories/pagination-params";
import { Item } from "../../enterprise/entities/item";

export interface ItemRepository{
    create(item: Item): Promise <void>
    findById(id: string): Promise<Item | null>
    delete(item: Item): Promise<void>
    save(item: Item): Promise<void>
    findManyByName(name: string, params: PaginationParams): Promise<Item[]>
}