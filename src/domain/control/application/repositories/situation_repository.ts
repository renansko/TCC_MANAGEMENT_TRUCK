import { Situation } from "../../enterprise/entities/situation";

export interface SituationRepository{
    create(situation: Situation): Promise <void>
}