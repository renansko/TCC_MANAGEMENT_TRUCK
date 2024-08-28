import { InMemorySituationRepository } from "test/repositories/in-memory-situation-repository";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-foud-error";
import { DeleteSituationUseCase } from "./delete-equipament-situation";
import { makeSituation } from "test/factories/make-situation";

let inMemorySituationRepository: InMemorySituationRepository
let sut: DeleteSituationUseCase

describe('Create Situation',() => {
    beforeEach(() => {
        inMemorySituationRepository = new InMemorySituationRepository()
        sut = new DeleteSituationUseCase(inMemorySituationRepository)
    })

    it('Should be able delete an situation', async () => {
        const newSituation = makeSituation()

        await inMemorySituationRepository.create(newSituation)


        const result = await sut.execute({
            situationId: newSituation.id.toString(),
        })
    
        expect(inMemorySituationRepository.items).toHaveLength(0)
    })

    it('Not should be able delete an inexistent situation', async () => {
        const newSituation = makeSituation()

        await inMemorySituationRepository.create(newSituation)

        const result = await sut.execute({
            situationId: '1',
        })
    
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})

