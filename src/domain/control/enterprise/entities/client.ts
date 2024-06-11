import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optionals"

    /**
     * Interface explicação de suas propiedades.
     * 
     * 
     * @param name (string) Nome do cliente
     * @param address (string) Endereço do cliente
     * @param email (string) email do cliente
     * @param phone (string) telefone do cliente
     */

export interface ClientProps{
    name: string
    address: string
    email: string
    phone: string
    createdAt: Date
    updatedAt?: Date
}

export class Client extends Entity<ClientProps>{
    get name(){
        return this.props.name
    }
    get address(){
        return this.props.address
    }
    get email(){
        return this.props.email
    }
    get phone(){
        return this.props.phone
    }

    private touch(){
        this.props.updatedAt = new Date()
    }


    static create(
        props: Optional<ClientProps, 'createdAt'>,
        id?: UniqueEntityID
    ){
        const client = new Client({
            ...props,
            createdAt: new Date()
        }, id)

        return client 
    }
}