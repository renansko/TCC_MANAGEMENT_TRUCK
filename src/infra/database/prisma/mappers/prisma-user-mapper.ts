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
        email: raw.email,
        phone: raw.phone,
        password: raw.password,
        cep: raw.cep,
        address: raw.address,
        birth: raw.birth,
        companyId: raw.companyId ? new UniqueEntityID(raw.companyId) : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf.value,
      birth: user.birth,
      attachmentId: user.

      cep: user.cep,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
