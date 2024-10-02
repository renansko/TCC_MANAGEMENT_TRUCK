import { makeUser } from 'test/factories/make-user'
import { InMemoryUserAttachmentRepository } from 'test/repositories/in-memory-user-attachment-repository'
import { FetchUsersUseCase } from './fetch-user-by-name'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

let inMemoryUserAttachmentRepository: InMemoryUserAttachmentRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: FetchUsersUseCase

describe('Fetch recent Users', () => {
  beforeEach(() => {
    inMemoryUserAttachmentRepository = new InMemoryUserAttachmentRepository()
    inMemoryUserRepository = new InMemoryUserRepository(
      inMemoryUserAttachmentRepository,
    )
    sut = new FetchUsersUseCase(inMemoryUserRepository)
  })

  it('Should be able to fetch recent user', async () => {
    await inMemoryUserRepository.create(
      makeUser({
        name: 'Joe Due 1',
      }),
    )
    await inMemoryUserRepository.create(
      makeUser({
        name: 'Joe Due 1',
      }),
    )
    await inMemoryUserRepository.create(
      makeUser({
        name: 'Joe Due 1',
      }),
    )

    const result = await sut.execute({
      name: 'Joe Due 1',
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value?.users).toHaveLength(3)
    }
  })

  it('Should be able to fetch paginated recents ansers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryUserRepository.create(
        makeUser({
          name: 'Joe Doe test',
        }),
      )
    }

    const result = await sut.execute({
      name: 'Joe Doe test',
      page: 2,
    })
    if (result.isRight()) {
      expect(result.value?.users).toHaveLength(2)
    }
  })
})
