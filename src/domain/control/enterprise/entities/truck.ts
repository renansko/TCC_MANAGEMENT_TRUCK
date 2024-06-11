import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optionals"


 /**
     * Interface explicação de suas propiedades.
     * 
     * 
     * @param name (string) Nome do caminhão
     * @param company (string) Empresa do caminhão
     * @param model (string) Modelo do caminhão
     * @param fuel (number) gasolina atual do caminhão
     * @param iaAutonomosId (UniqueEntityID) dados em 'tempo real' do caminhão
     * @param orderId (UniqueEntityID) Id do pedido a ser entregue pelo caminhão
     * @param createdAt (Date) "Data da criação do objeto virtual"
     * @param updatedAt (Date) "Mudança de informação do objeto"
     */
export interface TruckProps{
    name: string
    company: string
    model: string
    fuel: number
    iaAutonomosId?: UniqueEntityID
    orderId: UniqueEntityID
    situationId: UniqueEntityID
    status: boolean
    createdAt: Date
    updatedAt?: Date
}

export class Truck extends Entity<TruckProps>{
    get name(){
        return this.props.name
    }
    get company(){
        return this.props.company
    }
    get model(){
        return this.props.model
    }
    get fuel(){
        return this.props.fuel
    }

    get iaAutonomosId(){
        return this.props.iaAutonomosId
    }

    get orderId(){
        return this.props.orderId
    }
    get situationId(){
        return this.props.situationId
    }
    get status(){
        return this.props.status
    }
    get createdAt(){
        return this.props.createdAt
    }

    set name(name: string){
        this.props.name = name
        this.touch()
    }

    set company(company: string){
        this.props.company = company
        this.touch()
    }

    set model(model: string){
        this.props.model = model
        this.touch()
    }

    set fuel(fuel: number){
        this.props.fuel = fuel
        this.touch()
    }

    private touch(){
        this.props.updatedAt = new Date()
    }


    static create(
        props: Optional<TruckProps, 'createdAt' | 'iaAutonomosId'>,
        id?: UniqueEntityID
    ){
        const truck = new Truck({
            ...props,
            createdAt: new Date()
        }, id)

        return truck 
    }
}