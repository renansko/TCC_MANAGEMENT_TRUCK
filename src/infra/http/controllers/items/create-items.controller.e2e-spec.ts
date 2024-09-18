import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
describe('Create Items', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })
  it('[POST] /item', async () => {
    const response = await request(app.getHttpServer()).post('/item').send({
      name: 'Nome do Item',
      description: 'Descrição do item',
      quantity: 10,
      amount: 100.5,
      weight: 5.5,
    })

    expect(response.statusCode).toBe(201)

    const itemsOnDatabase = await prisma.item.findMany({
      where: {
        name: 'Nome do Item',
      },
    })

    expect(itemsOnDatabase).toBeTruthy()
  })
})
