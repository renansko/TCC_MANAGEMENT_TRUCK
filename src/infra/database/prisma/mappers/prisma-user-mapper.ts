import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/control/enterprise/entities/user'
import { UserCPF } from '@/domain/control/enterprise/entities/value-objects/user-cpf'
import { User as PrismaUser, Prisma } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        cpf: UserCPF.create(raw.cpf),
        address: raw.address,
        password: raw.password,
        email: raw.email,
        cep: raw.cep,
        birth: raw.birth,
        phone: raw.phone,
        companyId: raw.companyId ? new UniqueEntityID(raw.companyId) : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf.value,
      birth: user.birth,
      password: user.password,
      cep: user.cep,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
