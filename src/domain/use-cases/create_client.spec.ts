import { Client } from "../entities/client";
import { Order } from "../entities/order";
import { CreateClientUseCase } from "./create_client";
import { CreateOrderUseCase } from "./create_order";
import { SituationUseCase } from "./equipament_situations";

const fakeClientRepository = {
    create: async (client: Client) => {
        return;
    }
}

test('create a client', async () => {
    const createClientUseCase = new CreateClientUseCase(fakeClientRepository)

    const order = await createClientUseCase.execute({
        address: 'Rua enjoa',
        email:'Client@Madeira.com',
        name: 'Madeira Madeira',
        phone: '419902324525'
    })

    expect(order.phone).toEqual('419902324525')
   
})