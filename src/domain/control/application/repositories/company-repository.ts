import { Company } from '../../enterprise/entities/company'

export abstract class CompanyRepository {
  abstract create(company: Company): Promise<void>
  abstract findById(id: string): Promise<Company | null>
  abstract delete(company: Company): Promise<void>
}
