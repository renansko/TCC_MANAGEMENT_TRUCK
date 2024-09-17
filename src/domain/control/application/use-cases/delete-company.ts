import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-foud-error'
import { CompanyRepository } from '../repositories/company-repository'
import { Injectable } from '@nestjs/common'
interface DeleteCompanyRequest {
  companyId: string
}

type DeleteCompanyResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    companyId,
  }: DeleteCompanyRequest): Promise<DeleteCompanyResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      return left(new ResourceNotFoundError())
    }

    await this.companyRepository.delete(company)

    return right(null)
  }
}
