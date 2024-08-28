import { InMemoryOrderRepository } from "test/repositories/in-memory-order-repository";
import { CreateOrderUseCase } from "./create-order";

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: CreateOrderUseCase

describe('Create Order',() => {
    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository()
        sut = new CreateOrderUseCase(inMemoryOrderRepository)
    })

    it('Should be able create an order', async () => {
        const result = await sut.execute({
            userId:'1',
            dateDelivery: new Date(),
            dateRequested: new Date(),
            deliveryAddress: 'Rua dos advogados 999',
            loadId: '2',
            status: 'Caminhão está pronto'
        })
    
        expect(result.value?.order.status).toEqual('Caminhão está pronto')
    })
})

