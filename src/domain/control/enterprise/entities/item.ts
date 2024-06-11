import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optionals"

    /**
     * Interface explicação de suas propiedades.
     * 
     * 
     * @param name (string) nome do item
     * @param description (number) descrição do item.
     * @param quantity (number) quantidade do item: identificar se o item é unitario ou não
     * @param type (number) tipo do item, 'liquido'/'solido'/'gasoso'.
     * @param amount (number) preço do item.
     */

export interface ItemProps{
    name: string
    description: string
    quantity: number
    type: string
    amount: number
    createdAt: Date
    updatedAt?: Date
}

export class Item extends Entity<ItemProps>{
    get description(){
        return this.props.description
    }
    get name(){
        return this.props.name
    }
    get quantity(){
        return this.props.quantity
    }
    get type(){
        return this.props.type
    }
    get amount(){
        return this.props.amount
    }

    private touch(){
        this.props.updatedAt = new Date()
    }


    static create(
        props: Optional<ItemProps, 'createdAt'>,
        id?: UniqueEntityID
    ){
        const item = new Item({
            ...props,
            createdAt: new Date()
        }, id)

        return item 
    }
}