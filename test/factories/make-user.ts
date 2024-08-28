import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, userProps } from '@/domain/control/enterprise/entities/user'
import { UserCPF } from '@/domain/control/enterprise/entities/value-objects/user-cpf'

export function makeUser(
  override: Partial<userProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      cpf: UserCPF.createFromText('123.234.245-23'),
      address: 'Rua enjoa',
      password: '123456',
      email: 'user@Madeira.com',
      name: 'Madeira Madeira',
      phone: '419902324525',
      ...override,
    },
    id,
  )

  return user
}
