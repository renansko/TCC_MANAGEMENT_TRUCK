import { InMemoryOrderRepository } from "test/repositories/in-memory-order-repository";
import { DeleteOrderUseCase } from "./delete-order";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-foud-error";
import { makeOrder } from "test/factories/make-order";

let inMemoryOrderRepository: InMemoryOrderRepository
let sut: DeleteOrderUseCase

describe('Create Order',() => {
    beforeEach(() => {
        inMemoryOrderRepository = new InMemoryOrderRepository()
        sut = new DeleteOrderUseCase(inMemoryOrderRepository)
    })

    it('Should be able delete an order', async () => {
        const newOrder = makeOrder()

        await inMemoryOrderRepository.create(newOrder)


        const result = await sut.execute({
            orderId: newOrder.id.toString(),
        })
    
        expect(inMemoryOrderRepository.items).toHaveLength(0)
    })

    it('Not should be able delete an inexistent order', async () => {
        const newOrder = makeOrder()

        await inMemoryOrderRepository.create(newOrder)

        const result = await sut.execute({
            orderId: '1',
        })
    
        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})

