import { ItemRepository } from "@/domain/control/application/repositories/item_repository"
import { Item } from "@/domain/control/enterprise/entities/item"

export class InMemoryItemRepository implements ItemRepository{
    public items: Item[] = []
    
    async create(item: Item) {
        this.items.push(item)
    }

    async findById(id: string) {
        const item = this.items.find((item) => item.id.toString() === id)

        if(!item){
            return null
        }

        return item
    }

    async delete(item: Item) {
        const itemIndex = this.items.findIndex(
            (item) => item.id === item.id)

            this.items.splice(itemIndex, 1)
    }

}