import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
describe('Create Company', () => {
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
  it('[POST] /company', async () => {
    const response = await request(app.getHttpServer()).post('/company').send({
      name: 'Company Name',
      email: 'company@example.com',
      cep: '12345-678',
      address: 'Company Address',
      cnpj: '12345678901234',
      phone: '1234567890',
      password: 'password',
    })

    expect(response.statusCode).toBe(201)

    const companyOnDatabase = await prisma.company.findUnique({
      where: {
        email: 'company@example.com',
      },
    })

    expect(companyOnDatabase).toBeTruthy()
  })
})
