import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Order } from "../control/enterprise/entities/order"
import { OrderRepository } from "../control/application/repositories/order_repository"

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