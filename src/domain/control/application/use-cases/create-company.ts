import { Either, right } from '@/core/either'
import { Company } from '../../enterprise/entities/company'
import { CompanyCNPJ } from '../../enterprise/entities/value-objects/company-cnpj'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CompanyRepository } from '../repositories/company-repository'
import { Injectable } from '@nestjs/common'

interface CreateCompanyRequest {
  name: string
  cnpj: CompanyCNPJ
  address: string
  email: string
  phone: string
  password: string
  userId: string
}

type CreateCompanyResponse = Either<
  null,
  {
    company: Company
  }
>

@Injectable()
export class CreateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    cnpj,
    name,
    password,
    address,
    email,
    phone,
    userId,
  }: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const company = Company.create({
      cnpj,
      name,
      password,
      address,
      email,
      phone,
      userId: new UniqueEntityID(userId),
    })

    await this.companyRepository.create(company)

    return right({
      company,
    })
  }
}
