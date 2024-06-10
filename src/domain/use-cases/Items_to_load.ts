import { ItemRepository } from "../control/application/repositories/item_repository";
import { Item } from "../control/enterprise/entities/item";

interface ItemsToLoadRequest {
    name: string
    description: string
    quantity: number
    type: string
    amount: number
}

export class ItemsToLoadUseCase {
    constructor(
        private itemsRepository: ItemRepository
    ) {}

    async execute({
        name,
        description,
        quantity,
        type,
        amount,
    }:ItemsToLoadRequest ){
        const item = Item.create({
            name,
            description,
            quantity,
            type,
            amount,
        })

        this.itemsRepository.create(item)

        return item
    }
}