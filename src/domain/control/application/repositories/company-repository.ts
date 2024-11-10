import { PaginationParams } from '@/core/repositories/pagination-params'
import { Company } from '../../enterprise/entities/company'

export abstract class CompanyRepository {
  abstract create(company: Company): Promise<void>
  abstract findById(id: string): Promise<Company | null>
  abstract delete(company: Company): Promise<void>
  abstract save(company: Company): Promise<void>
  abstract findByEmail(email: string): Promise<Company | null>
  abstract findManyByName(
    name: string,
    params: PaginationParams,
  ): Promise<Company[]>
}
