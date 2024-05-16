import { Situation } from "../entities/situation";

export interface SituationRepository{
    create(situation: Situation): Promise <void>
}