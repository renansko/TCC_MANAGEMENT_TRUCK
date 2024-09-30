import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CompanyFactory } from 'test/factories/make-company'
describe('Edit Company', () => {
  let app: INestApplication
  let prisma: PrismaService
  let companyFactory: CompanyFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CompanyFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    companyFactory = moduleRef.get(CompanyFactory)

    await app.init()
  })
  it('[UPDATE] /company/{id}', async () => {
    const company = await companyFactory.makePrismaCompany()

    const companyId = company.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/company/${companyId}`)
      .send({
        name: 'New name',
        email: 'new@email.com',
        cep: '12333-493',
        cnpj: '12345678901234',
        address: 'Novo endereco',
        phone: '99902-2029',
      })
    expect(response.statusCode).toBe(204)
    const companyOnDatabase = await prisma.company.findFirst({
      where: {
        id: companyId,
      },
    })

    expect(companyOnDatabase).toEqual(
      expect.objectContaining({
        name: 'New name',
      }),
    )
  })
})
