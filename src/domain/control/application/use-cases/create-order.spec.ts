import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { CreateOrderUseCase } from './create-order'
import { InMemoryItemRepository } from 'test/repositories/in-memory-item-respository'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { Item } from '../../enterprise/entities/item'
import { User } from '../../enterprise/entities/user'
import { UserCPF } from '../../enterprise/entities/value-objects/user-cpf'
import { ItemNotFoundError } from './errors/not-found-error'

let inMemoryOrderRepository: InMemoryOrderRepository
let inMemoryItemRepository: InMemoryItemRepository
let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateOrderUseCase

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new CreateOrderUseCase(
      inMemoryOrderRepository,
      inMemoryItemRepository,
      inMemoryUserRepository,
    )
  })

  it('Should be able create an order', async () => {
    const item = Item.create({
      name: 'Cimento',
      description: 'Cimento de 50kg',
      amount: 100,
      quantity: 10,
      weight: 10,
    })

    inMemoryItemRepository.items.push(item)

    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: UserCPF.create('1234567890'),
      cep: '12345678',
      birth: '16/03/1022',
      address: 'Rua dos advogados 999',
      phone: '1234567890',
    })

    inMemoryUserRepository.items.push(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      dateDelivery: new Date(),
      dateRequested: new Date(),
      deliveryAddress: 'Rua dos advogados 999',
      itemId: item.id.toString(),
      status: 'Caminhão está pronto',
    })

    if (result.isRight()) {
      expect(result.value.order.status).toEqual('Caminhão está pronto')
    }
  })

  it('Not should be able create an order with an invalid item', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: UserCPF.create('1234567890'),
      cep: '12345678',
      birth: '16/03/1022',
      address: 'Rua dos advogados 999',
      phone: '1234567890',
    })

    inMemoryUserRepository.items.push(user)

    const result = await sut.execute({
      userId: '1',
      dateDelivery: new Date(),
      dateRequested: new Date(),
      deliveryAddress: 'Rua dos advogados 999',
      itemId: '2',
      status: 'Caminhão está pronto',
    })

    expect(result.value).toBeInstanceOf(ItemNotFoundError)
  })

  it('Not should be able create an order with an invalid user', async () => {
    const item = Item.create({
      name: 'Cimento',
      description: 'Cimento de 50kg',
      amount: 100,
      quantity: 10,
      weight: 10,
    })

    inMemoryItemRepository.items.push(item)

    const result = await sut.execute({
      userId: '1',
      dateDelivery: new Date(),
      dateRequested: new Date(),
      deliveryAddress: 'Rua dos advogados 999',
      itemId: '2',
      status: 'Caminhão está pronto',
    })

    expect(result.value).toBeInstanceOf(ItemNotFoundError)
  })
})
