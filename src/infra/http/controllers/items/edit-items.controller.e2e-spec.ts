import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ItemFactory } from 'test/factories/make-item'
describe('Edit Item', () => {
  let app: INestApplication
  let prisma: PrismaService
  let itemFactory: ItemFactory
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ItemFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    itemFactory = moduleRef.get(ItemFactory)

    await app.init()
  })
  it('[UPDATE] /item/{id}', async () => {
    const item = await itemFactory.makePrismaItem()

    const itemId = item.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/item/${itemId}`)
      .send({
        name: 'Geso',
        description: 'New Item',
        quantity: 21,
        amount: 100,
        weight: 790,
      })
    expect(response.statusCode).toBe(204)
    const itemOnDatabase = await prisma.item.findFirst({
      where: {
        id: itemId,
      },
    })

    expect(itemOnDatabase).toEqual(
      expect.objectContaining({
        name: 'Geso',
      }),
    )
  })
})
