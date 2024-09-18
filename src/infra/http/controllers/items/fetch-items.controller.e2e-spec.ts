import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { ItemFactory } from 'test/factories/make-item'
import { DatabaseModule } from '@/infra/database/database.module'
describe('Fetch item per name (E2E)', () => {
  let app: INestApplication
  let itemFactory: ItemFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ItemFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    itemFactory = moduleRef.get(ItemFactory)

    await app.init()
  })

  test('[GET] /items/name', async () => {
    const item = await itemFactory.makePrismaItem({
      name: 'Madeira',
      amount: 100,
    })

    const nameItem = item.name

    const response = await request(app.getHttpServer())
      .get(`/item/${nameItem}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      items: expect.arrayContaining([
        expect.objectContaining({
          name: 'Madeira',
          amount: 100,
        }),
      ]),
    })
  })
})
