import { Maintainable } from "../entities/maintainable";
import { TruckMaintainableUseCase } from "./truck_maintainables";

const fakeMaintanaibleRepository = {
    create: async (maintainable: Maintainable) => {
        return;
    }
}

test('create a truck', async () => {
    const truckMaintainableUseCase = new TruckMaintainableUseCase(fakeMaintanaibleRepository)

    const truckMaintanaible = await truckMaintainableUseCase.execute({
        name: "Sensor de distancia",
        situationId: '1',
        startDate: new Date(),
        timeForMaintenance: 360,
        type: 'Sensor'
        
    })

    expect(truckMaintanaible.name).toEqual("Sensor de distancia")
})