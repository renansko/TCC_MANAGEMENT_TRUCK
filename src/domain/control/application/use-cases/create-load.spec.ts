import { InMemoryLoadRepository } from 'test/repositories/in-memory-load-repository'
import { LoadUseCase } from './create-load'

let inMemoryLoadRepository: InMemoryLoadRepository
let sut: LoadUseCase

describe('Create Load ', () => {
  beforeEach(() => {
    inMemoryLoadRepository = new InMemoryLoadRepository()
    sut = new LoadUseCase(inMemoryLoadRepository)
  })

  it('Should be able to create a  load', async () => {
    const result = await sut.execute({
      itemsId: '1',
      truckId: '2',
      type: 'Composto Quimico',
      weight: 100,
    })

    expect(result.value?.load.type).toEqual('Composto Quimico')
  })
})
