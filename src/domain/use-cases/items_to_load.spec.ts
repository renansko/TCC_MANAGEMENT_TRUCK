import { Item } from "../entities/item";
import { ItemsToLoadUseCase } from "./Items_to_load";
import { CreateOrderUseCase } from "./create_order";

const fakeItemRepository = {
    create: async (item: Item) => {
        return;
    }
}

test('create a item to load', async () => {
    const itemToLoadUseCase = new ItemsToLoadUseCase(fakeItemRepository)

    const item = await itemToLoadUseCase.execute({
        name: 'eucalipto',
        amount: 49.2,
        description: 'Madeira exportada e condensada',
        quantity: 100,
        type: 'Solido'

    })

    expect(item.quantity).toEqual(100)
   
})