import { makeTransfer } from 'test/factories/make-transfer'
import { InMemoryTransferAttachmentRepository } from 'test/repositories/in-memory-transfer-attachment-repository'
import { FetchTransfersUseCase } from './fetch-transfer-by-name'
import { InMemoryTransferRepository } from 'test/repositories/in-memory-transfer-repository'

let inMemoryTransferAttachmentRepository: InMemoryTransferAttachmentRepository
let inMemoryTransferRepository: InMemoryTransferRepository
let sut: FetchTransfersUseCase

describe('Fetch recent Transfers', () => {
  beforeEach(() => {
    inMemoryTransferAttachmentRepository =
      new InMemoryTransferAttachmentRepository()
    inMemoryTransferRepository = new InMemoryTransferRepository(
      inMemoryTransferAttachmentRepository,
    )
    sut = new FetchTransfersUseCase(inMemoryTransferRepository)
  })

  it('Should be able to fetch recent transfer', async () => {
    await inMemoryTransferRepository.create(
      makeTransfer({
        name: 'Car 1',
      }),
    )
    await inMemoryTransferRepository.create(
      makeTransfer({
        name: 'Car 1',
      }),
    )
    await inMemoryTransferRepository.create(
      makeTransfer({
        name: 'Car 1',
      }),
    )

    const result = await sut.execute({
      name: 'Car 1',
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value?.transfers).toHaveLength(3)
    }
  })

  it('Should be able to fetch paginated recents ansers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryTransferRepository.create(
        makeTransfer({
          name: 'Joe Doe test',
        }),
      )
    }

    const result = await sut.execute({
      name: 'Joe Doe test',
      page: 2,
    })
    if (result.isRight()) {
      expect(result.value?.transfers).toHaveLength(2)
    }
  })
})
