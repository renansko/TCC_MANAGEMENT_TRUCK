import { Order } from "../../enterprise/entities/order";

export interface OrderRepository{
    create(order: Order): Promise <void>
    findById(id: string): Promise<Order | null>
    delete(item: Order): Promise<void>
}