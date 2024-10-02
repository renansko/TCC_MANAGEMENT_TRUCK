import { makeCompany } from 'test/factories/make-company'
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository'
import { FetchCompanysUseCase } from './fetch-company-by-name'

let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: FetchCompanysUseCase

describe('Fetch Companys recent ', () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository()
    sut = new FetchCompanysUseCase(inMemoryCompanyRepository)
  })

  it('Should be able to fetch recent companys', async () => {
    await inMemoryCompanyRepository.create(
      makeCompany({
        name: 'CompaniaTeste',
      }),
    )
    await inMemoryCompanyRepository.create(
      makeCompany({
        name: 'CompaniaTeste',
      }),
    )
    await inMemoryCompanyRepository.create(
      makeCompany({
        name: 'CompaniaTeste',
      }),
    )

    const result = await sut.execute({
      name: 'CompaniaTeste',
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value?.companys).toHaveLength(3)
    }
  })

  it('Should be able to fetch paginated recents answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCompanyRepository.create(
        makeCompany({
          name: 'Madeira',
        }),
      )
    }

    const result = await sut.execute({
      name: 'Madeira',
      page: 2,
    })
    if (result.isRight()) {
      expect(result.value?.companys).toHaveLength(2)
    }
  })
})
