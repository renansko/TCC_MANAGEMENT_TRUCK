import { InMemoryLoadRepository } from "test/repositories/in-memory-load-repository";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-foud-error";
import { makeLoad } from "test/factories/make-load";
import { DeleteLoadUseCase } from "./delete-load";

let inMemoryLoadRepository: InMemoryLoadRepository
let sut: DeleteLoadUseCase

describe('Create Load',() => {
    beforeEach(() => {
        inMemoryLoadRepository = new InMemoryLoadRepository()
        sut = new DeleteLoadUseCase(inMemoryLoadRepository)
    })

    it('Should be able delete an load', async () => {
        const newLoad = makeLoad()

        await inMemoryLoadRepository.create(newLoad)


        const result = await sut.execute({
            loadId: newLoad.id.toString(),
        })
    
        expect(inMemoryLoadRepository.items).toHaveLength(0)
    })

    it('Not should be able delete an inexistent load', async () => {
        const newLoad = makeLoad()

        await inMemoryLoadRepository.create(newLoad)

        const result = await sut.execute({
            loadId: '1',
        })
    
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})

