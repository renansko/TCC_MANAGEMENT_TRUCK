import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ItemFactory } from 'test/factories/make-item'
import { OrderFactory } from 'test/factories/make-order'
import { UserFactory } from 'test/factories/make-user'
describe('Create Order', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let itemFactory: ItemFactory
  let orderFactory: OrderFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory, UserFactory, ItemFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    userFactory = moduleRef.get(UserFactory)

    itemFactory = moduleRef.get(ItemFactory)

    orderFactory = moduleRef.get(OrderFactory)

    await app.init()
  })
  it('[DELETE] /order/{id}', async () => {
    const user = await userFactory.makePrismaUser()

    const item = await itemFactory.makePrismaItem()

    const order = await orderFactory.makePrismaOrder({
      userId: user.id,
      itemId: item.id,
    })

    const orderId = order.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/order/${orderId}`)
      .send()
    expect(response.statusCode).toBe(204)

    const orderOnDatabase = await prisma.order.findMany({
      where: {
        status: 'PENDING',
      },
    })

    expect(orderOnDatabase).toHaveLength(0)
  })
})
