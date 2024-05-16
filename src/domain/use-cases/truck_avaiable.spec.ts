import { Truck } from "../entities/truck";
import { TruckLoadedUseCase } from "./truck_avaiable";

const fakeTruckRepository = {
    create: async (truck: Truck) => {
        return;
    }
}

test('create a truck', async () => {
    const truckLoaded = new TruckLoadedUseCase(fakeTruckRepository)

    const truck = await truckLoaded.execute({
        name: "TruckChypherOne",
        company: "TruckersIA",
        model: "LoaderBasic",
        fuel: 50,
        situation: "1",
        orderId: "1"
    })

    expect(truck.name).toEqual("TruckChypherOne")
    expect(truck).toBeTypeOf("object")
    expect(truck.situationId).toBeTruthy()
})