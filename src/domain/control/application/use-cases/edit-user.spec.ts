import { makeUser } from 'test/factories/make-user'
import { EditUserUseCase } from './edit-user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeCompany } from 'test/factories/make-company'
import { InMemoryUserAttachmentRepository } from 'test/repositories/in-memory-user-attachment-repository'
import { makeUserAttachment } from 'test/factories/make-user-attatchment'
import { UserCPF } from '../../enterprise/entities/value-objects/user-cpf'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUserAttachmentRepository: InMemoryUserAttachmentRepository
let sut: EditUserUseCase

describe('Edit User by id', () => {
  beforeEach(() => {
    inMemoryUserAttachmentRepository = new InMemoryUserAttachmentRepository()
    inMemoryUserRepository = new InMemoryUserRepository(
      inMemoryUserAttachmentRepository,
    )
    sut = new EditUserUseCase(
      inMemoryUserRepository,
      inMemoryUserAttachmentRepository,
    )
  })

  it('Should be possible edit a user with a id', async () => {
    const company = makeCompany()
    const companyId = company.id
    const newUser = makeUser({ companyId }, new UniqueEntityID('user-1'))

    await inMemoryUserRepository.create(newUser)

    inMemoryUserAttachmentRepository.items.push(
      makeUserAttachment({
        userId: newUser.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeUserAttachment({
        userId: newUser.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      name: 'User Teste',
      userId: 'user-1',
      companyId: companyId.toString(),
      cpf: UserCPF.createFromText('12345678912'),
      address: 'Address test',
      password: 'password',
      email: 'test@test.com',
      cep: '28377450',
      birth: '02/10/2003',
      phone: '(41) 99923-1234',
      attachments: ['1', '2'],
    })

    expect(inMemoryUserRepository.items[0]).toMatchObject({
      address: 'Address test',
      name: 'User Teste',
    })
    expect(
      inMemoryUserRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryUserRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
