
import { Either, right } from "@/core/either"
import { Client } from "../../enterprise/entities/client"
import { ClientRepository } from "../repositories/client_repository"

interface CreateClientRequest {
    name: string
    address: string
    email: string
    phone: string
}

type CreateClientResponse = Either<
    null, 
    {
        client: Client
    }
>

export class CreateClientUseCase {
    constructor(
        private clientRepository: ClientRepository
    ) {}

    async execute({
        name,
        address,
        email,
        phone,
    }:CreateClientRequest): Promise<CreateClientResponse>{
        const client = Client.create({
            name,
            address,
            email,
            phone
        })

        await this.clientRepository.create(client)

        return right({
            client
        })
    }
}