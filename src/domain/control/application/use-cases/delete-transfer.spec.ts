import { makeTransfer } from 'test/factories/make-transfer'
import { DeleteTransferUseCase } from './delete-transfer'
import { InMemoryTransferRepository } from 'test/repositories/in-memory-transfer-repository'
import { InMemoryTransferAttachmentRepository } from 'test/repositories/in-memory-transfer-attachment-repository'

let inMemoryTransferRepository: InMemoryTransferRepository
let inMemoryTransferAttachmentRepository: InMemoryTransferAttachmentRepository
let sut: DeleteTransferUseCase

beforeEach(() => {
  inMemoryTransferAttachmentRepository =
    new InMemoryTransferAttachmentRepository()
  inMemoryTransferRepository = new InMemoryTransferRepository(
    inMemoryTransferAttachmentRepository,
  )
  sut = new DeleteTransferUseCase(inMemoryTransferRepository)
})

describe('Delete Transfer', () => {
  it('Should be able to delete a transfer', async () => {
    const newTransfer = makeTransfer()

    await inMemoryTransferRepository.create(newTransfer)

    await sut.execute({
      transferId: newTransfer.id.toString(),
    })

    const transferDeleted = await inMemoryTransferRepository.findById(
      newTransfer.id.toString(),
    )
    expect(transferDeleted).toBeNull()
  })
})
