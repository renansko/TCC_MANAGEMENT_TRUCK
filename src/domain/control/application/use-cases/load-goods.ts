import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Load } from "../../enterprise/entities/load"
import { LoadRepository } from "../repositories/load_repository"
import { Either, right } from "@/core/either"

interface LoadGoodsRequest {
    type: string
    weight: number
    itemsId: string
}

type LoadGoodsResponse = Either<
null,
    {
        load: Load
    }   
>

export class LoadGoodsUseCase {
    constructor(
        private loadRepository: LoadRepository
    ) {}

    async execute({type, weight, itemsId}: LoadGoodsRequest): Promise<LoadGoodsResponse>{
        const load = Load.create({
            type,
            weight,
            itemsId: new UniqueEntityID(itemsId)
        })

        this.loadRepository.create(load)

        return right({ 
            load
        })
    }
}