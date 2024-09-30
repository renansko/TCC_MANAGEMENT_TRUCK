import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ItemFactory } from 'test/factories/make-item'
import { UserFactory } from 'test/factories/make-user'
describe('Create Orders', () => {
  let app: INestApplication
  let prisma: PrismaService

  let itemFactory: ItemFactory
  let userFactory: UserFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [ItemFactory, UserFactory, PrismaService],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    itemFactory = moduleRef.get(ItemFactory)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })
  it('[POST] /order', async () => {
    const item = await itemFactory.makePrismaItem()
    const user = await userFactory.makePrismaUser()

    const response = await request(app.getHttpServer()).post('/order').send({
      itemId: item.id.toString(),
      userId: user.id.toString(),
      name: 'Name',
      dateRequested: new Date(),
      dateDelivery: new Date(),
      deliveryAddress: 'Rua Exemplo, 123',
      status: 'Pendente',
    })

    expect(response.statusCode).toBe(201)

    const ordersOnDatabase = await prisma.order.findMany({
      where: {},
    })

    expect(ordersOnDatabase).toBeTruthy()
  })
})
