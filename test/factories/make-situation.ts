import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Situation, SituationProps } from '@/domain/control/enterprise/entities/situation'

export function makeSituation(
  override: Partial<SituationProps> = {},
  id?: UniqueEntityID,
) {
  const situation = Situation.create(
    {
        description: faker.lorem.sentence(3),
        exchangeRequired: '10dias',
    ...override,
    },
    id,
  )

  return situation
}
