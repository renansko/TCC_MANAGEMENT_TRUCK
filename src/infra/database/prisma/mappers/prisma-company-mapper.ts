import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Company } from '@/domain/control/enterprise/entities/company'
import { CompanyCNPJ } from '@/domain/control/enterprise/entities/value-objects/company-cnpj'
import { Company as PrismaCompany, Prisma } from '@prisma/client'

export class PrismaCompanyMapper {
  static toDomain(raw: PrismaCompany): Company {
    return Company.create(
      {
        name: raw.name,
        cnpj: CompanyCNPJ.create(raw.cnpj),
        email: raw.email,
        phone: raw.phone,
        password: raw.password,
        cep: raw.cep,
        address: raw.address,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(company: Company): Prisma.CompanyUncheckedCreateInput {
    return {
      name: company.name,
      email: company.email,
      phone: company.phone,
      cnpj: company.cnpj.value,
      password: company.password,
      cep: company.cep,
      address: company.address,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    }
  }
}
