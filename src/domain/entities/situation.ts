import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optionals"

    /**
     * Interface explicação de suas propiedades.
     * 
     * 
     * @param description (string) descrição da situação atual do item relacionado acima
     * @param exchangeRequired (string) calculo/contendo a necessidade para realizar a troca
     * @param createdAt (Date) "Data da criação do objeto virtual"
     * @param updatedAt (Date) "Mudança de informação do objeto"
     */
interface SituationProps{
    description: string // descrição da ultima situação
    exchangeRequired: string
    createdAt: Date
    updatedAt?: Date
}

export class Situation extends Entity<SituationProps>{

    get description(){
        return this.props.description
    }
    get exchangeRequired(){
        return this.props.exchangeRequired
    }


    private touch(){
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<SituationProps, 'createdAt'>,
        id?: UniqueEntityID
    ){
        const situation = new Situation({
            ...props,
            createdAt: new Date()
        }, id)

        return situation 
    }
}