import { InMemoryTransferRepository } from 'test/repositories/in-memory-transfer-repository'
import { CreateTransferUseCase } from './create-transfer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryTransferAttachmentRepository } from 'test/repositories/in-memory-transfer-attachment-repository'
import { PlateAlreadyExistsError } from './errors/plate-already-exists-error'
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository'
import { CompanyCNPJ } from '../../enterprise/entities/value-objects/company-cnpj'
import { Company } from '../../enterprise/entities/company'
import { CompanyNotExistsError } from './errors/company-not-exists-error'

let inMemoryTransferRepository: InMemoryTransferRepository
let inMemoryTransferAttachmentRepository: InMemoryTransferAttachmentRepository
let inMemoryCompanyRepository: InMemoryCompanyRepository
let sut: CreateTransferUseCase

describe('Create avaiable transfer', () => {
  beforeEach(() => {
    inMemoryCompanyRepository = new InMemoryCompanyRepository()
    inMemoryTransferAttachmentRepository =
      new InMemoryTransferAttachmentRepository()
    inMemoryTransferRepository = new InMemoryTransferRepository(
      inMemoryTransferAttachmentRepository,
    )
    sut = new CreateTransferUseCase(
      inMemoryTransferRepository,
      inMemoryCompanyRepository,
    )
  })
  it('Should be able create a avaiable transfer', async () => {
    const company = Company.create({
      name: 'CompanyChypherOne',
      cnpj: new CompanyCNPJ('12345678912345'),
      email: 'company@chypher.com',
      password: '123456',
      address: 'Rua João da Silva, 123',
      cep: '12345-678',
      phone: '419902324525',
    })

    inMemoryCompanyRepository.items.push(company)

    const result = await sut.execute({
      name: 'TransferChypherOne',
      plate: '123-abc',
      model: 'LoaderBasic',
      companyId: company.id.toString(),
      attachmentIds: ['1'],
    })
    expect(result.isRight()).toBe(true)
    expect(
      inMemoryTransferRepository.items[0].attachments.currentItems,
    ).toHaveLength(1)
    if (result.isRight()) {
      expect(result.value.transfer.name).toEqual('TransferChypherOne')
      expect(inMemoryTransferRepository.items[0]).toEqual(result.value.transfer)
    }
    expect(
      inMemoryTransferRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
    ])
  })

  it('Not should be able create a transfer with same plate', async () => {
    const company = Company.create({
      name: 'CompanyChypherOne',
      cnpj: new CompanyCNPJ('12345678912345'),
      email: 'company@chypher.com',
      password: '123456',
      address: 'Rua João da Silva, 123',
      cep: '12345-678',
      phone: '419902324525',
    })

    inMemoryCompanyRepository.items.push(company)

    await sut.execute({
      name: 'transfer-1',
      plate: '123-abc',
      model: 'LoaderBasic',
      companyId: company.id.toString(),
      attachmentIds: ['1'],
    })

    const result = await sut.execute({
      name: 'transfer-2',
      plate: '123-abc',
      model: 'LoaderBasic',
      companyId: company.id.toString(),
      attachmentIds: ['1'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PlateAlreadyExistsError)
  })
  it('Not should be able create a transfer with a company that not exists', async () => {
    const result = await sut.execute({
      name: 'transfer-1',
      plate: '123-abc',
      model: 'LoaderBasic',
      companyId: '2',
      attachmentIds: ['1'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(CompanyNotExistsError)
  })
})

test('create a transfer', async () => {})
