import { InMemoryTransferRepository } from 'test/repositories/in-memory-transfer-repository'
import { TransferAvaiableUseCase } from './create-truck'

let inMemoryTransferRepository: InMemoryTransferRepository
let sut: TransferAvaiableUseCase

describe('Create avaiable transfer', () => {
  beforeEach(() => {
    inMemoryTransferRepository = new InMemoryTransferRepository()
    sut = new TransferAvaiableUseCase(inMemoryTransferRepository)
  })
  it('Should be able create a avaiable transfer', async () => {
    const result = await sut.execute({
      name: 'TransferChypherOne',
      placa: '123-abc',
      model: 'LoaderBasic',
      companyId: '2',
      situationId: '1',
      orderId: '3',
      telemetryId: '2',
    })

    expect(result.value?.transfer.name).toEqual('TransferChypherOne')
    expect(result.value).toBeTypeOf('object')
    expect(result.value?.transfer).toBeTruthy()
  })
})

test('create a transfer', async () => {})
