import { InMemoryTruckRepository } from "test/repositories/in-memory-truck-repository";
import { TruckAvaiableUseCase } from "./create-truck";

let inMemoryTruckRepository: InMemoryTruckRepository
let sut: TruckAvaiableUseCase

describe('Create avaiable truck', () => {
    beforeEach(() => {
        inMemoryTruckRepository = new InMemoryTruckRepository
        sut = new TruckAvaiableUseCase(inMemoryTruckRepository)
    })
    it('Should be able create a avaiable truck', async () => {
        const result = await sut.execute({
            name: "TruckChypherOne",
            company: "TruckersIA",
            model: "LoaderBasic",
            fuel: 50,
            situation: "1",
            orderId: "3",
            telemetryId: "2"
        })
    
        expect(result.value?.truck.name).toEqual("TruckChypherOne")
        expect(result.value).toBeTypeOf("object")
        expect(result.value?.truck).toBeTruthy()
    } )
})

test('create a truck', async () => {

  
})