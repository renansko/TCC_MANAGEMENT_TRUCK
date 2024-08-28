import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-foud-error"
import { LoadRepository } from "../repositories/load-repository"

interface DeleteRequest {
   loadId: string
}

type DeleteResponse = Either<
    ResourceNotFoundError, 
    {}
>

export class DeleteLoadUseCase {
    constructor(
        private loadRepository: LoadRepository
    ) {}

    async execute({
        loadId,
    }:DeleteRequest): Promise<DeleteResponse>{
        

        const load = await this.loadRepository.findById(loadId)

        if(!load){
            return left(new ResourceNotFoundError())
        }

        await this.loadRepository.delete(load)

        return right({       
        })
    }
}