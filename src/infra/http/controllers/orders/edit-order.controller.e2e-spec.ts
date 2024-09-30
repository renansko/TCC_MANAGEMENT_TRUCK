import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ItemFactory } from 'test/factories/make-item'
import { OrderFactory } from 'test/factories/make-order'
import { UserFactory } from 'test/factories/make-user'
describe('Edit Order', () => {
  let app: INestApplication
  let prisma: PrismaService
  let orderFactory: OrderFactory
  let userFactory: UserFactory
  let itemFactory: ItemFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory, UserFactory, ItemFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    orderFactory = moduleRef.get(OrderFactory)
    userFactory = moduleRef.get(UserFactory)
    itemFactory = moduleRef.get(ItemFactory)

    await app.init()
  })
  it('[UPDATE] /order/{id}', async () => {
    const user = await userFactory.makePrismaUser()
    const item = await itemFactory.makePrismaItem()

    const order = await orderFactory.makePrismaOrder({
      userId: user.id,
      itemId: item.id,
    })

    const orderId = order.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/order/${orderId}`)
      .send({
        userId: user.id.toString(),
        itemId: item.id.toString(),
        deliveryAddress: 'Novo endereco',
        name: 'Novo nome',
        dateDelivery: new Date(),
        dateRequested: new Date(),
        status: 'status',
      })
    console.log(response)
    expect(response.statusCode).toBe(204)

    const orderOnDatabase = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    })

    expect(orderOnDatabase).toEqual(
      expect.objectContaining({
        name: 'Novo nome',
      }),
    )
  })
})
