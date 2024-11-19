import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { AuthenticateClientUseCase } from './authenticate-client'
import { InMemoryUserAttachmentRepository } from 'test/repositories/in-memory-user-attachment-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUserAttachmentRepository: InMemoryUserAttachmentRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateClientUseCase

describe('Authenticate Client', () => {
  beforeEach(() => {
    inMemoryUserAttachmentRepository = new InMemoryUserAttachmentRepository()
    inMemoryUserRepository = new InMemoryUserRepository(
      inMemoryUserAttachmentRepository,
    )
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateClientUseCase(
      inMemoryUserRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a client', async () => {
    const client = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUserRepository.create(client)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
