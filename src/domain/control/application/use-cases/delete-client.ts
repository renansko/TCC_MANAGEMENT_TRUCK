import { Either, left, right } from "@/core/either"
import { ClientRepository } from "../repositories/client_repository"
import { ResourceNotFoundError } from "./errors/resource-not-foud-error"

interface DeleteClientRequest {
   clientId: string
}

type DeleteClientResponse = Either<
    ResourceNotFoundError, 
    {}
>

export class DeleteClientUseCase {
    constructor(
        private clientRepository: ClientRepository
    ) {}

    async execute({
        clientId,
    }:DeleteClientRequest): Promise<DeleteClientResponse>{
        

        const client = await this.clientRepository.findById(clientId)

        if(!client){
            return left(new ResourceNotFoundError())
        }

        await this.clientRepository.delete(client)

        return right({       
        })
    }
}