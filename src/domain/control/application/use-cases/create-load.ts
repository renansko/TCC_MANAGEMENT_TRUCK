import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Load } from "../../enterprise/entities/load"
import { LoadRepository } from "../repositories/load-repository"
import { Either, right } from "@/core/either"

interface LoadRequest {
    type: string
    weight: number
    itemsId: string
}

type LoadResponse = Either<
null,
    {
        load: Load
    }   
>

export class LoadUseCase {
    constructor(
        private loadRepository: LoadRepository
    ) {}

    async execute({type, weight, itemsId}: LoadRequest): Promise<LoadResponse>{
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