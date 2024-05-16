import { Order } from "../entities/order";
import { CreateOrderUseCase } from "./create_order";
import { SituationUseCase } from "./equipament_situations";

const fakeOrderRepository = {
    create: async (order: Order) => {
        return;
    }
}

test('create a order', async () => {
    const createOrderUseCase = new CreateOrderUseCase(fakeOrderRepository)

    const order = await createOrderUseCase.execute({
        clientId:'1',
        dateDelivery: new Date(),
        dateRequested: new Date(),
        deliveryAddress: 'Rua dos advogados 999',
        loadId: '2',
        status: 'Caminhão está pronto'
    })

    expect(order.status).toEqual('Caminhão está pronto')
   
})