import { Company } from '@/domain/control/enterprise/entities/company'

export class CompanyPresenter {
  static toHTTP(company: Company) {
    return {
      id: company.id.toString(),
      name: company.name,
      email: company.email,
      cep: company.cep,
      cnpj: company.cnpj,
      address: company.address,
      phone: company.phone,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    }
  }
}
