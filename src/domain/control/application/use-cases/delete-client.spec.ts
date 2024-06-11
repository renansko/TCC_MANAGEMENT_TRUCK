import { InMemoryClientRepository } from "test/repositories/in-memory-client-repository";
import { DeleteClientUseCase } from "./delete-client";
import { makeClient } from "test/factories/make-client";
import { ResourceNotFoundError } from "./errors/resource-not-foud-error";

let inMemoryClientRepository: InMemoryClientRepository
let sut: DeleteClientUseCase

describe('Create Order',() => {
    beforeEach(() => {
        inMemoryClientRepository = new InMemoryClientRepository()
        sut = new DeleteClientUseCase(inMemoryClientRepository)
    })

    it('Should be able delete an client', async () => {
        const newClient = makeClient()

        await inMemoryClientRepository.create(newClient)


        const result = await sut.execute({
            clientId: newClient.id.toString(),
        })
    
        expect(inMemoryClientRepository.items).toHaveLength(0)
    })

    it('Not should be able delete an inexistent client', async () => {
        const newClient = makeClient()

        await inMemoryClientRepository.create(newClient)


        const result = await sut.execute({
            clientId: '1',
        })
    
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})

