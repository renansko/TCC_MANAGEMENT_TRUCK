import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Load } from "../entities/load"
import { LoadRepository } from "../repositories/load_repository"

interface LoadGoodsRequest {
    type: string
    weight: number
    itemsId: string
}

export class LoadGoodsUseCase {
    constructor(
        private loadRepository: LoadRepository
    ) {}

    async execute({type, weight, itemsId}: LoadGoodsRequest){
        const loadGoods = Load.create({
            type,
            weight,
            itemsId: new UniqueEntityID(itemsId)
        })

        this.loadRepository.create(loadGoods)

        return loadGoods
    }
}