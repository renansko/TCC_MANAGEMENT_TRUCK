import { ItemRepository } from "@/domain/control/application/repositories/item_repository"
import { Item } from "@/domain/control/enterprise/entities/item"

export class InMemoryItemRepository implements ItemRepository{
    public items: Item[] = []
    
    async create(item: Item) {
        this.items.push(item)
    }

}