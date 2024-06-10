import { Client } from "../../enterprise/entities/client";

export interface ClientRepository{
    create(client: Client): Promise <void>
}