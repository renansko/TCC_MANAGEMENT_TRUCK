import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optionals"


 /**
     * Interface explicação de suas propiedades.
     * 
     * 
     * @param loadId (UniqueEntityID) Id da carga a ser carregada no caminhão
     * @param clientId (UniqueEntityID) Informação do cliente contratante
     * @param dateRequested (number) Data que foi realizada a pedido no sistema
     * @param dateDelivery (UniqueEntityID) Data que foi requisitada a entrega
     * @param deliveryAddress (UniqueEntityID) local de entrega
     * @param status (string) status para o caminhão está 'pronto' ou não
     * @param createdAt (Date) "Data da criação do objeto virtual"
     * @param updatedAt (Date) "Mudança de informação do objeto"
     */
interface OrderProps{
    loadId: UniqueEntityID
    clientId: UniqueEntityID
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
    get clientId(){
        return this.props.clientId
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