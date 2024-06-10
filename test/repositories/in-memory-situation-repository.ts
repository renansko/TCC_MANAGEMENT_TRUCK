import { SituationRepository } from "@/domain/control/application/repositories/situation_repository"
import { Situation } from "@/domain/control/enterprise/entities/situation"

export class InMemorySituationRepository implements SituationRepository{
    public items: Situation[] = []
    
    async create(situation: Situation) {
        this.items.push(situation)
    }

}