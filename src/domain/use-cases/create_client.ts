import { SituationRepository } from "../repositories/situation_repository"
import { Situation } from "../entities/situation"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { OrderRepository } from "../repositories/order_repository"
import { Order } from "../entities/order"
import { ClientRepository } from "../repositories/client_repository"
import { Client } from "../entities/client"

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