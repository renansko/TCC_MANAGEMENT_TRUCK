import { makeTransfer } from 'test/factories/make-transfer'
import { EditTransferUseCase } from './edit-transfer'
import { InMemoryTransferAttachmentRepository } from 'test/repositories/in-memory-transfer-attachment-repository'
import { InMemoryTransferRepository } from 'test/repositories/in-memory-transfer-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeTransferAttachment } from 'test/factories/make-transfer-attachment'
import { makeCompany } from 'test/factories/make-company'
import { makeUser } from 'test/factories/make-user'

let inMemoryTransferRepository: InMemoryTransferRepository
let inMemoryTransferAttachmentRepository: InMemoryTransferAttachmentRepository
let sut: EditTransferUseCase

describe('Edit Transfer by id', () => {
  beforeEach(() => {
    inMemoryTransferAttachmentRepository =
      new InMemoryTransferAttachmentRepository()
    inMemoryTransferRepository = new InMemoryTransferRepository(
      inMemoryTransferAttachmentRepository,
    )
    sut = new EditTransferUseCase(
      inMemoryTransferRepository,
      inMemoryTransferAttachmentRepository,
    )
  })

  it('Should be possible edit a transfer with a id', async () => {
    const companyId = makeCompany()

    const newTransfer = makeTransfer(
      { companyId: companyId.id },
      new UniqueEntityID('transfer-1'),
    )

    await inMemoryTransferRepository.create(newTransfer)

    inMemoryTransferAttachmentRepository.items.push(
      makeTransferAttachment({
        transferId: newTransfer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeTransferAttachment({
        transferId: newTransfer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    const driverId = makeUser()

    await sut.execute({
      transferId: 'transfer-1',
      companyId: companyId.id.toString(),
      model: 'Model teste',
      name: 'Sandeiro Teste',
      plate: 'ABD-123',
      driverId: driverId.id.toString(),
      attachments: ['1', '3'],
    })

    expect(inMemoryTransferRepository.items[0]).toMatchObject({
      model: 'Model teste',
      name: 'Sandeiro Teste',
    })
    expect(
      inMemoryTransferRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryTransferRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })
})
