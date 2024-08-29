import { CreateCompanyUseCase } from './create-company'
import { CompanyCNPJ } from '../../enterprise/entities/value-objects/company-cnpj'
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository'

let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: CreateCompanyUseCase

describe('Create a company', () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository()
    sut = new CreateCompanyUseCase(inMemoryCompanyRepository)
  })

  it('Should be able to create an company', async () => {
    const result = await sut.execute({
      cnpj: CompanyCNPJ.createFromText('12345678912242'),
      address: 'Rua enjoa',
      password: '123456',
      email: 'company@Madeira.com',
      name: 'Empresa de contas',
      phone: '419902324525',
    })

    expect(result.value?.company.phone).toEqual('419902324525')
    expect(result.value?.company.cnpj.value).toEqual('12.345.678/9122-42')
  })
})
