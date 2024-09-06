import { Either, right } from '@/core/either'
import { Company } from '../../enterprise/entities/company'
import { CompanyCNPJ } from '../../enterprise/entities/value-objects/company-cnpj'
import { CompanyRepository } from '../repositories/company-repository'
import { Injectable } from '@nestjs/common'

interface CreateCompanyRequest {
  name: string
  email: string
  cep: string
  cnpj: CompanyCNPJ
  address: string
  phone: string
  password: string
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
    name,
    email,
    cep,
    cnpj,
    password,
    address,
    phone,
  }: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const company = Company.create({
      name,
      email,
      cep,
      cnpj,
      password,
      address,
      phone,
    })

    await this.companyRepository.create(company)

    return right({
      company,
    })
  }
}
