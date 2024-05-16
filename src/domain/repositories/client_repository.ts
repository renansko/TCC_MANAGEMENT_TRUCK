import { Client } from "../entities/client";

export interface ClientRepository{
    create(client: Client): Promise <void>
}