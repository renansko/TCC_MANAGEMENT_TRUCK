import { ClientRepository } from "@/domain/control/application/repositories/client_repository";
import { Client } from "@/domain/control/enterprise/entities/client";

export class InMemoryClientRepository implements ClientRepository{
    public items: Client[] = []
    
    async create(client: Client) {
        this.items.push(client)
    }

    async findById(id: string) {
        const client = this.items.find((item) => item.id.toString() === id)

        if(!client){
            return null
        }

        return client
    }

    async delete(client: Client) {
        const clientIndex = this.items.findIndex(
            (item) => item.id === client.id)

            this.items.splice(clientIndex, 1)
    }

}