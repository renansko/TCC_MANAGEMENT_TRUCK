import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-foud-error'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { DeleteUserUseCase } from './delete-user'
import { makeUser } from 'test/factories/make-user'
import { InMemoryUserAttachmentRepository } from 'test/repositories/in-memory-user-attachment-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeUserAttachment } from 'test/factories/make-user-attatchment'

let inMemoryuserRepository: InMemoryUserRepository
let inMemoryUserAttachmentRepository: InMemoryUserAttachmentRepository
let sut: DeleteUserUseCase

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryUserAttachmentRepository = new InMemoryUserAttachmentRepository()
    inMemoryuserRepository = new InMemoryUserRepository(
      inMemoryUserAttachmentRepository,
    )
    sut = new DeleteUserUseCase(inMemoryuserRepository)
  })

  it('Should be able delete an user', async () => {
    const newUser = makeUser({}, new UniqueEntityID('user-1'))

    await inMemoryuserRepository.create(newUser)

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
      userId: 'user-1',
    })

    expect(inMemoryuserRepository.items).toHaveLength(0)
    expect(inMemoryUserAttachmentRepository.items).toHaveLength(0)
  })

  it('Not should be able delete an inexistent user', async () => {
    const newUser = makeUser()

    await inMemoryuserRepository.create(newUser)

    const result = await sut.execute({
      userId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
