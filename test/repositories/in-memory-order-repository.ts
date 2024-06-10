import { OrderRepository } from "@/domain/control/application/repositories/order_repository"
import { Order } from "@/domain/control/enterprise/entities/order"

export class InMemoryOrderRepository implements OrderRepository{
    public items: Order[] = []
    
    async create(order: Order) {
        this.items.push(order)
    }

}