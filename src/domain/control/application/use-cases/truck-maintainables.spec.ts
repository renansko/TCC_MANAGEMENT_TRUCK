import { InMemoryMaintainableRepository } from "test/repositories/in-memory-maintainable-repository";
import { TruckItensMaintainableUseCase } from "./truck-maintainables";

let inMemoryMaintainableRepository: InMemoryMaintainableRepository
let sut: TruckItensMaintainableUseCase

describe('Create a Maintanables Items', () => {
    beforeEach(() => {
        inMemoryMaintainableRepository = new InMemoryMaintainableRepository
        sut = new TruckItensMaintainableUseCase(inMemoryMaintainableRepository)
    })

    it('Should be able create a maintanable item', async () => {
        const result = await sut.execute({
            name: "Sensor de distancia",
            situationId: '1',
            startDate: new Date(),
            timeForMaintenance: 360,
            type: 'Sensor'
        })

    expect(result.value?.maintainable.name).toEqual("Sensor de distancia")

    })
}) 