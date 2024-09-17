import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Company,
  companyProps,
} from '@/domain/control/enterprise/entities/company'
import { CompanyCNPJ } from '@/domain/control/enterprise/entities/value-objects/company-cnpj'

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
