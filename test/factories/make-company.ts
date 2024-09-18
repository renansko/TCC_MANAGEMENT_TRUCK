import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Company,
  companyProps,
} from '@/domain/control/enterprise/entities/company'
import { CompanyCNPJ } from '@/domain/control/enterprise/entities/value-objects/company-cnpj'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaCompanyMapper } from '@/infra/database/prisma/mappers/prisma-company-mapper'

export function makeCompany(
  override: Partial<companyProps> = {},
  id?: UniqueEntityID,
) {
  const company = Company.create(
    {
      name: faker.company.name(),
      cnpj: new CompanyCNPJ(faker.string.numeric(14)),
      address: faker.location.streetAddress(),
      cep: '23866394',
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      ...override,
    },
    id,
  )

  return company
}

@Injectable()
export class CompanyFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCompany(data: Partial<companyProps> = {}): Promise<Company> {
    const company = makeCompany(data)

    await this.prisma.company.create({
      data: PrismaCompanyMapper.toPrisma(company),
    })

    return company
  }
}
