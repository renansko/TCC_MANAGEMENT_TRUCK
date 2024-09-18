import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ItemFactory } from 'test/factories/make-item'
describe('Create Item', () => {
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
  it('[DELETE] /item/{id}', async () => {
    const item = await itemFactory.makePrismaItem({
      name: 'Madeira',
    })

    const itemId = item.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/item/${itemId}`)
      .send()
    expect(response.statusCode).toBe(204)

    const itemOnDatabase = await prisma.item.findMany({
      where: {
        name: 'Madeira',
      },
    })

    expect(itemOnDatabase).toHaveLength(0)
  })
})
