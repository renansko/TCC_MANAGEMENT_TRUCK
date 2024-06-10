import { InMemoryClientRepository } from "test/repositories/in-memory-client-repository";
import { CreateClientUseCase } from "./create-client";

let inMemoryClientRepository: InMemoryClientRepository
let sut: CreateClientUseCase

describe('Create a client', ()=> {
    beforeEach(() => {
        inMemoryClientRepository = new InMemoryClientRepository()
        sut = new CreateClientUseCase(inMemoryClientRepository)
    })

    it('Should be able to create an client', async () => {
        const result = await sut.execute({
            address: 'Rua enjoa',
            email:'Client@Madeira.com',
            name: 'Madeira Madeira',
            phone: '419902324525'
        })
    
        expect(result.value?.client.phone).toEqual('419902324525')
       
    })
})