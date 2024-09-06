import { InMemoryTransferRepository } from 'test/repositories/in-memory-transfer-repository'
import { CreateTransferUseCase } from './create-transfer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryTransferAttachmentRepository } from 'test/repositories/in-memory-transfer-attachment-repository'

let inMemoryTransferRepository: InMemoryTransferRepository
let inMemoryTransferAttachmentRepository: InMemoryTransferAttachmentRepository
let sut: CreateTransferUseCase

describe('Create avaiable transfer', () => {
  beforeEach(() => {
    inMemoryTransferAttachmentRepository =
      new InMemoryTransferAttachmentRepository()
    inMemoryTransferRepository = new InMemoryTransferRepository(
      inMemoryTransferAttachmentRepository,
    )
    sut = new CreateTransferUseCase(inMemoryTransferRepository)
  })
  it('Should be able create a avaiable transfer', async () => {
    const result = await sut.execute({
      name: 'TransferChypherOne',
      plate: '123-abc',
      model: 'LoaderBasic',
      companyId: '2',
      attachmentIds: ['1'],
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryTransferRepository.items[0]).toEqual(result.value?.transfer)
    expect(
      inMemoryTransferRepository.items[0].attachments.currentItems,
    ).toHaveLength(1)
    expect(result.value?.transfer.name).toEqual('TransferChypherOne')
    expect(
      inMemoryTransferRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
    ])
  })
})

test('create a transfer', async () => {})
