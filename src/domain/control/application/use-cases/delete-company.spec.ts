import { makeCompany } from 'test/factories/make-company'
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository'
import { DeleteCompanyUseCase } from './delete-company'

let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: DeleteCompanyUseCase

beforeEach(() => {
  inMemoryCompanyRepository = new InMemoryCompanyRepository()
  sut = new DeleteCompanyUseCase(inMemoryCompanyRepository)
})

describe('Delete Company', () => {
  it('Should be able to delete a company', async () => {
    const newCompany = makeCompany()

    await inMemoryCompanyRepository.create(newCompany)

    await sut.execute({
      companyId: newCompany.id.toString(),
    })

    const companyDeleted = await inMemoryCompanyRepository.findById(
      newCompany.id.toString(),
    )
    expect(companyDeleted).toBeNull()
  })
})
