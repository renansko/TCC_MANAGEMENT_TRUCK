import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optionals"

    /**
     * Interface explicação de suas propiedades.
     * 
     * 
     * @param type (string) O tipo de carga/ 'explosivo'/'quimico'
     * @param weight (number) peso total da carga.
     * @param itemsId (UniqueEntityID) Lista dos itens na entrega
     * 
     */

export interface LoadProps{
    type: string
    weight: number
    itemsId: UniqueEntityID
    createdAt: Date
    updatedAt?: Date
}

export class Load extends Entity<LoadProps>{
    get weight(){
        return this.props.weight
    }
    get itemsId(){
        return this.props.itemsId
    }
    get type(){
        return this.props.type
    }

    private touch(){
        this.props.updatedAt = new Date()
    }


    static create(
        props: Optional<LoadProps, 'createdAt'>,
        id?: UniqueEntityID
    ){
        const load = new Load({
            ...props,
            createdAt: new Date()
        }, id)

        return load 
    }
}