import { SituationRepository } from "../repositories/situation_repository"
import { Situation } from "../entities/situation"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { OrderRepository } from "../repositories/order_repository"
import { Order } from "../entities/order"

interface CreateOrderRequest {
    loadId: string
    clientId: string
    dateRequested: Date
    dateDelivery: Date
    deliveryAddress: string
    status: string
}

export class CreateOrderUseCase {
    constructor(
        private orderRepository: OrderRepository
    ) {}

    async execute({
        loadId,
        clientId,
        dateDelivery,
        dateRequested,
        deliveryAddress,
        status
    }:CreateOrderRequest){
        const createOrder = Order.create({
            loadId: new UniqueEntityID(loadId),
            clientId: new UniqueEntityID(clientId),
            dateRequested,
            dateDelivery,
            deliveryAddress,
            status,
        })

        this.orderRepository.create(createOrder)

        return createOrder
    }
}