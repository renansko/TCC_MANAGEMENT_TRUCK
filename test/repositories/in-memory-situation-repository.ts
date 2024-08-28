import { SituationRepository } from '@/domain/control/application/repositories/situation-repository'
import { Situation } from '@/domain/control/enterprise/entities/situation'

export class InMemorySituationRepository implements SituationRepository {
  public items: Situation[] = []

  async create(situation: Situation) {
    this.items.push(situation)
  }

  async findById(id: string) {
    const situation = this.items.find((item) => item.id.toString() === id)

    if (!situation) {
      return null
    }

    return situation
  }

  async delete(situation: Situation) {
    const situationIndex = this.items.findIndex(
      (item) => item.id === situation.id,
    )

    this.items.splice(situationIndex, 1)
  }
}
