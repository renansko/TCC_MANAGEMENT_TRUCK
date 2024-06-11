import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optionals"

    /**
     * Interface explicação de suas propiedades.
     * 
     * 
     * @param situationId (UniqueEntityID) (UniqueEntityID) Id com as informações da situação do objeto
     * @param name (string) Nome do objeto manutenivel: Pneu, Freio, Sensores...
     * @param type (string) "Pensado caso tenha diferença entre senores/itens-padrão-do-carro"
     * @param timeForMaintenance (number) "Tempo regularizado para a manutenção preventiva"
     * @param startDate (Date) "Real data de começo da operação do objeto"
     * @param createdAt (Date) "Data da criação do objeto virtual"
     * @param updatedAt (Date) "Mudança de informação do objeto"
     */
export interface maintainableProps{
    situationId: UniqueEntityID
    name: string // pneu
    type: string // Sensor - 
    timeForMaintenance: number // minutos
    startDate: Date
    createdAt: Date
    updatedAt?: Date
}

export class Maintainable extends Entity<maintainableProps>{
    get situationId(){
        return this.props.situationId
    }
    get name(){
        return this.props.name
    }
    get type(){
        return this.props.type
    }
    get timeForMaintenance(){
        return this.props.timeForMaintenance
    }
    
    get startDate(){
        return this.props.startDate
    }
    
    
    private touch(){
        this.props.updatedAt = new Date()
    }
    
   
    static create(
        props: Optional<maintainableProps, 'createdAt'>,
        id?: UniqueEntityID
    ){
        const maintainable = new Maintainable({
            ...props,
            createdAt: new Date()
        }, id)

        return maintainable
    }
}