import { Situation } from '../../enterprise/entities/situation'

export abstract class SituationRepository {
  abstract create(situation: Situation): Promise<void>
  abstract findById(id: string): Promise<Situation | null>
  abstract delete(item: Situation): Promise<void>
}
