import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { TruckRepository } from "../repositories/truck_repository";
import { Truck } from "../entities/truck";
import { ItemRepository } from "../repositories/item_repository";
import { Item } from "../entities/item";

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