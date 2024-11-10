import { PaginationParams } from '@/core/repositories/pagination-params'
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

  async findByEmail(email: string): Promise<Company | null> {
    const company = this.items.find((item) => item.email === email)

    if (!company) {
      return null
    }

    return company
  }

  async delete(company: Company) {
    const companyIndex = this.items.findIndex((item) => item.id === company.id)

    this.items.splice(companyIndex, 1)
  }

  async save(company: Company) {
    const itemIndex = this.items.findIndex((item) => item.id === company.id)

    this.items[itemIndex] = company
  }

  async findManyByName(name: string, { page }: PaginationParams) {
    const company = this.items
      .filter((item) => item.name.toString() === name)
      .splice((page - 1) * 20, page * 20)

    return company
  }
}
