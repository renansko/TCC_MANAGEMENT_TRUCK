import { Either, left, right } from '@/core/either'
import { Company } from '../../enterprise/entities/company'
import { CompanyRepository } from '../repositories/company-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

interface FetchCompanysUseCaseRequest {
  name: string
  page: number
}

type FetchCompanysUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    companys: Company[]
  }
>

@Injectable()
export class FetchCompanysUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    name,
    page,
  }: FetchCompanysUseCaseRequest): Promise<FetchCompanysUseCaseResponse> {
    const companys = await this.companyRepository.findManyByName(name, {
      page,
    })

    if (!companys) {
      throw left(new ResourceNotFoundError())
    }

    return right({
      companys,
    })
  }
}
