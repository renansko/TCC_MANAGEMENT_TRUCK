import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Client, ClientProps } from '@/domain/control/enterprise/entities/client'

export function makeClient(
  override: Partial<ClientProps> = {},
  id?: UniqueEntityID,
) {
  const client = Client.create(
    {
      address: 'Rua enjoa',
      email:'Client@Madeira.com',
      name: 'Madeira Madeira',
      phone: '419902324525',
      ...override,
    },
    id,
  )

  return client
}
