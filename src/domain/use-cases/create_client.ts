import { ClientRepository } from "../control/application/repositories/client_repository"
import { Client } from "../control/enterprise/entities/client"

interface CreateClientRequest {
    name: string
    address: string
    email: string
    phone: string
}

export class CreateClientUseCase {
    constructor(
        private clientRepository: ClientRepository
    ) {}

    async execute({
        name,
        address,
        email,
        phone,
    }:CreateClientRequest){
        const createClient = Client.create({
            name,
            address,
            email,
            phone
        })

        this.clientRepository.create(createClient)

        return createClient
    }
}