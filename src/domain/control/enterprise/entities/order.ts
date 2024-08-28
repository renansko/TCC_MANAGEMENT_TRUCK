import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optionals"


 /**
     * Interface explicação de suas propiedades.
     * 
     * 
     * @param loadId (UniqueEntityID) Id da carga a ser carregada no caminhão
     * @param userId (UniqueEntityID) Informação do usere contratante
     * @param dateRequested (number) Data que foi realizada a pedido no sistema
     * @param dateDelivery (UniqueEntityID) Data que foi requisitada a entrega
     * @param deliveryAddress (UniqueEntityID) local de entrega
     * @param status (string) status para o caminhão está 'pronto' ou não
     * @param createdAt (Date) "Data da criação do objeto virtual"
     * @param updatedAt (Date) "Mudança de informação do objeto"
     */

export interface OrderProps{
    loadId: UniqueEntityID
    userId: UniqueEntityID
    dateRequested: Date
    dateDelivery: Date
    deliveryAddress: string
    status: string
    createdAt: Date
    updatedAt?: Date
}

export class Order extends Entity<OrderProps>{
    get loadId(){
        return this.props.loadId
    }
    get userId(){
        return this.props.userId
    }
    get dateRequested(){
        return this.props.dateRequested
    }
    get deliveryAddress(){
        return this.props.deliveryAddress
    }
    get dateDelivery(){
        return this.props.dateDelivery
    }
    get status(){
        return this.props.status
    }

    private touch(){
        this.props.updatedAt = new Date()
    }


    static create(
        props: Optional<OrderProps, 'createdAt'>,
        id?: UniqueEntityID
    ){
        const order = new Order({
            ...props,
            createdAt: new Date()
        }, id)

        return order 
    }
}