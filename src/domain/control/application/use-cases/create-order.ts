import { SituationRepository } from "../repositories/situation_repository"
import { Situation } from "../../enterprise/entities/situation"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { OrderRepository } from "../repositories/order_repository"
import { Order } from "../../enterprise/entities/order"
import { Either, right } from "@/core/either"

interface CreateOrderRequest {
    loadId: string
    clientId: string
    dateRequested: Date
    dateDelivery: Date
    deliveryAddress: string
    status: string
}

type CreateOrderResponse = Either<
    null, 
    {
        order: Order
    }
>

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
    }:CreateOrderRequest): Promise<CreateOrderResponse>{
        const order = Order.create({
            loadId: new UniqueEntityID(loadId),
            clientId: new UniqueEntityID(clientId),
            dateRequested,
            dateDelivery,
            deliveryAddress,
            status,
        })

        this.orderRepository.create(order)

        return right({
            order
        })
    }
}