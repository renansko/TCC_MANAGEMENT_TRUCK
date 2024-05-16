import { Item } from "../entities/item";

export interface ItemRepository{
    create(item: Item): Promise <void>
}