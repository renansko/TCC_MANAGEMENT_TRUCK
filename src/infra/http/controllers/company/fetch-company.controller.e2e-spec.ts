import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { CompanyFactory } from 'test/factories/make-company'
import { DatabaseModule } from '@/infra/database/database.module'
describe('Fetch company per name (E2E)', () => {
  let app: INestApplication
  let companyFactory: CompanyFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CompanyFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    companyFactory = moduleRef.get(CompanyFactory)

    await app.init()
  })

  test('[GET] /company/name', async () => {
    const company = await companyFactory.makePrismaCompany({
      name: 'Company teste',
    })

    const nameCompany = company.name

    const response = await request(app.getHttpServer())
      .get(`/company/${nameCompany}`)
      .send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      companys: expect.arrayContaining([
        expect.objectContaining({
          name: 'Company teste',
        }),
      ]),
    })
  })
})
