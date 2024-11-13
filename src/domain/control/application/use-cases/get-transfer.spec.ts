import { makeTransfer } from 'test/factories/make-transfer'
import { InMemoryTransferAttachmentRepository } from 'test/repositories/in-memory-transfer-attachment-repository'
import { InMemoryTransferRepository } from 'test/repositories/in-memory-transfer-repository'
import { GetTransfersUseCase } from './get-transfer'

let inMemoryTransferAttachmentRepository: InMemoryTransferAttachmentRepository
let inMemoryTransferRepository: InMemoryTransferRepository
let sut: GetTransfersUseCase

describe('Get all transfer', () => {
  beforeEach(() => {
    inMemoryTransferAttachmentRepository =
      new InMemoryTransferAttachmentRepository()
    inMemoryTransferRepository = new InMemoryTransferRepository(
      inMemoryTransferAttachmentRepository,
    )
    sut = new GetTransfersUseCase(inMemoryTransferRepository)
  })

  it('Should be able to get all transfer', async () => {
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
      page: 1,
    })
    console.log(result.value)
    if (result.isRight()) {
      expect(result.value?.transfers).toHaveLength(1)
    }
  })

  it('Should be able to all paginated recents ansers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryTransferRepository.create(
        makeTransfer({
          name: 'Joe Doe test',
        }),
      )
    }

    const result = await sut.execute({
      page: 2,
    })
    if (result.isRight()) {
      expect(result.value?.transfers).toHaveLength(1)
    }
  })
})
