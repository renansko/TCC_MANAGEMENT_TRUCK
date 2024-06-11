import { Client } from "../../enterprise/entities/client";

export interface ClientRepository{
    create(client: Client): Promise <void>
    findById(id: string): Promise<Client | null>
    delete(client: Client): Promise<void>
}