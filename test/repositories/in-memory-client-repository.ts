import { ClientRepository } from "@/domain/control/application/repositories/client_repository";
import { Client } from "@/domain/control/enterprise/entities/client";

export class InMemoryClientRepository implements ClientRepository{
    public items: Client[] = []
    
    async create(client: Client) {
        this.items.push(client)
    }

}