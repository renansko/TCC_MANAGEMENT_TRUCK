import { Either, left, right } from '@/core/either'
import { Company } from '../../enterprise/entities/company'
import { CompanyRepository } from '../repositories/company-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { Injectable } from '@nestjs/common'
import { CompanyCNPJ } from '../../enterprise/entities/value-objects/company-cnpj'

interface EditCompanyUseCaseRequest {
  companyId: string
  name: string
  email: string
  cep: string
  cnpj: CompanyCNPJ
  address: string
  phone: string
}

type EditCompanyUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    company: Company
  }
>

@Injectable()
export class EditCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    companyId,
    name,
    email,
    cep,
    cnpj,
    address,
    phone,
  }: EditCompanyUseCaseRequest): Promise<EditCompanyUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      return left(new ResourceNotFoundError())
    }

    company.name = name
    company.email = email
    company.cep = cep
    company.cnpj = cnpj
    company.address = address
    company.phone = phone

    await this.companyRepository.save(company)

    return right({
      company,
    })
  }
}
