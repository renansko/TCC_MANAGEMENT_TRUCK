import { Load } from "../entities/load";
import { LoadGoodsUseCase } from "./load_goods";

const fakeLoadRepository = {
    create: async (load: Load) => {
        return;
    }
}

test('create a load', async () => {
    const load = new LoadGoodsUseCase(fakeLoadRepository)

    const truck = await load.execute({
        itemsId: '1',
        type: 'Composto Quimico',
        weight: 100
    })

    expect(truck.type).toEqual('Composto Quimico')
   
})