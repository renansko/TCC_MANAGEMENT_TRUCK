import { makeUser } from "test/factories/make-user";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-foud-error";
import { InMemoryUserRepository } from "test/repositories/in-memory-user-repository";
import { DeleteUserUseCase } from "./delete-user";

let inMemoryuserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Create Order',() => {
    beforeEach(() => {
        inMemoryuserRepository = new InMemoryUserRepository()
        sut = new DeleteUserUseCase(inMemoryuserRepository)
    })

    it('Should be able delete an user', async () => {
        const newuser = makeUser()

        await inMemoryuserRepository.create(newuser)


        const result = await sut.execute({
            userId: newuser.id.toString(),
        })
    
        expect(inMemoryuserRepository.items).toHaveLength(0)
    })

    it('Not should be able delete an inexistent user', async () => {
        const newuser = makeUser()

        await inMemoryuserRepository.create(newuser)


        const result = await sut.execute({
            userId: '1',
        })
    
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})

