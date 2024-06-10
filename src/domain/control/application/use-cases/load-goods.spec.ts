import { InMemoryLoadRepository } from "test/repositories/in-memory-load-repository";
import { LoadGoodsUseCase } from "./load-goods";

let inMemoryLoadRepository: InMemoryLoadRepository
let sut: LoadGoodsUseCase

describe('Create Load goods', () => {
    beforeEach(() => {
        inMemoryLoadRepository = new InMemoryLoadRepository
        sut = new LoadGoodsUseCase(inMemoryLoadRepository)
    })

    it('Should be able to create a goods load', async () => {
        const result = await sut.execute({
            itemsId: '1',
            type: 'Composto Quimico',
            weight: 100
        })
    
        expect(result.value?.load.type).toEqual('Composto Quimico')
    })
})

