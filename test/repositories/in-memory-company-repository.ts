import { CompanyRepository } from '@/domain/control/application/repositories/company-repository'
import { Company } from '@/domain/control/enterprise/entities/company'

export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = []

  async create(company: Company) {
    this.items.push(company)
  }

  async findById(id: string) {
    const company = this.items.find((item) => item.id.toString() === id)

    if (!company) {
      return null
    }

    return company
  }

  async delete(company: Company) {
    const companyIndex = this.items.findIndex((item) => item.id === company.id)

    this.items.splice(companyIndex, 1)
  }
}
