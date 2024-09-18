import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CompanyFactory } from 'test/factories/make-company'
describe('Create Users', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CompanyFactory, PrismaService],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })
  it('[POST] /user', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      name: 'João da Silva',
      cpf: '123.456.789-00',
      address: 'Rua Exemplo, 123',
      password: 'senha123',
      email: 'joao@exemplo.com',
      cep: '12345-678',
      birth: '1990-01-01',
      phone: '(11) 98765-4321',
    })

    expect(response.statusCode).toBe(201)

    const usersOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'joao@exemplo.com',
      },
    })

    expect(usersOnDatabase).toBeTruthy()
  })
})
