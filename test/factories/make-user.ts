import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, userProps } from '@/domain/control/enterprise/entities/user'
import { UserCPF } from '@/domain/control/enterprise/entities/value-objects/user-cpf'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

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
      birth: '16/03/2001',
      cep: '99999999',
      ...override,
    },
    id,
  )

  return user
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<userProps> = {}): Promise<User> {
    const user = makeUser(data)

    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    })

    return user
  }
}
