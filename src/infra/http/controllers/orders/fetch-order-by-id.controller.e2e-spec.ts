import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { OrderFactory } from 'test/factories/make-order'
import { DatabaseModule } from '@/infra/database/database.module'
import { UserFactory } from 'test/factories/make-user'
import { ItemFactory } from 'test/factories/make-item'
describe('Fetch order per name (E2E)', () => {
  let app: INestApplication
  let orderFactory: OrderFactory
  let userFactory: UserFactory
  let itemFactory: ItemFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory, UserFactory, ItemFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    orderFactory = moduleRef.get(OrderFactory)
    userFactory = moduleRef.get(UserFactory)
    itemFactory = moduleRef.get(ItemFactory)

    await app.init()
  })

  test('[GET] /order/name', async () => {
    const user = await userFactory.makePrismaUser()
    const item = await itemFactory.makePrismaItem()

    const order = await orderFactory.makePrismaOrder({
      itemId: item.id,
      userId: user.id,
      name: 'Pedido de madeira',
    })

    const nameOrder = order.name
    const response = await request(app.getHttpServer())
      .get(`/order/${nameOrder}`)
      .send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      orders: expect.arrayContaining([
        expect.objectContaining({
          name: 'Pedido de madeira',
        }),
      ]),
    })
  })
})
