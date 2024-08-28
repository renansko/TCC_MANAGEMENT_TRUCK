import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, userProps } from '@/domain/control/enterprise/entities/user'

export function makeUser(
  override: Partial<userProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      address: 'Rua enjoa',
      password: '123456',
      email:'user@Madeira.com',
      name: 'Madeira Madeira',
      phone: '419902324525',
      ...override,
    },
    id,
  )

  return user
}
