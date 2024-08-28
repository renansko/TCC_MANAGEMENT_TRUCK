import { InMemorySituationRepository } from 'test/repositories/in-memory-situation-repository'
import { SituationUseCase } from './equipament-situations'

let inMemorySituationRepository: InMemorySituationRepository
let sut: SituationUseCase

describe('Create equipament situation', () => {
  beforeEach(() => {
    inMemorySituationRepository = new InMemorySituationRepository()
    sut = new SituationUseCase(inMemorySituationRepository)
  })

  it('Should be able create a situation equipament', async () => {
    const result = await sut.execute({
      description: 'Otimo estado, colocado recentemente',
      exchangeRequired: '100 dias',
    })

    expect(result.value?.situation.description).toEqual(
      'Otimo estado, colocado recentemente',
    )
  })
})
