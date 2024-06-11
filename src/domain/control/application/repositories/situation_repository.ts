import { Situation } from "../../enterprise/entities/situation";

export interface SituationRepository{
    create(situation: Situation): Promise <void>
    findById(id: string): Promise<Situation | null>
    delete(item: Situation): Promise<void>
}