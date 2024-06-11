import { Item } from "../../enterprise/entities/item";

export interface ItemRepository{
    create(item: Item): Promise <void>
    findById(id: string): Promise<Item | null>
    delete(item: Item): Promise<void>
}