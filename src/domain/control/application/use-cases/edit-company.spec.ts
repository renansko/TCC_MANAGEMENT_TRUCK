import { makeCompany } from 'test/factories/make-company'
import { EditCompanyUseCase } from './edit-company'
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository'
import { CompanyCNPJ } from '../../enterprise/entities/value-objects/company-cnpj'

let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: EditCompanyUseCase

describe('Edit Company by id', () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository()
    sut = new EditCompanyUseCase(inMemoryCompanyRepository)
  })

  it('Should be possible edit a company with a id', async () => {
    const company = makeCompany()

    await inMemoryCompanyRepository.create(company)

    await sut.execute({
      companyId: company.id.toString(),
      address: 'New address',
      cep: 'New Cep',
      cnpj: new CompanyCNPJ('12345678911323'),
      email: 'New Email',
      name: 'new Name',
      phone: 'New phone',
    })

    expect(inMemoryCompanyRepository.items[0]).toMatchObject({
      phone: 'New phone',
      name: 'new Name',
    })
  })
})
