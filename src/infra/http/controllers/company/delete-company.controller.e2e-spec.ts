import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CompanyFactory } from 'test/factories/make-company'
describe('Delete Company', () => {
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
  it('[DELETE] /company/{id}', async () => {
    const company = await companyFactory.makePrismaCompany({
      name: 'Company Joe Doe',
    })

    const companyId = company.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/company/${companyId}`)
      .send()
    expect(response.statusCode).toBe(204)

    const companyOnDatabase = await prisma.company.findUnique({
      where: {
        email: 'company@example.com',
      },
    })

    expect(companyOnDatabase).toBeNull()
  })
})
