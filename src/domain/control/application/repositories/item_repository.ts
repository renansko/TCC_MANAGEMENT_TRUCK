import { Item } from "../../enterprise/entities/item";

export interface ItemRepository{
    create(item: Item): Promise <void>
}