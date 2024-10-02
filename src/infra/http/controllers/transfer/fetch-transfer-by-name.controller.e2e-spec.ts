import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { TransferFactory } from 'test/factories/make-transfer'
import { DatabaseModule } from '@/infra/database/database.module'
import { UserFactory } from 'test/factories/make-user'
import { CompanyFactory } from 'test/factories/make-company'
describe('Fetch transfer per name (E2E)', () => {
  let app: INestApplication
  let transferFactory: TransferFactory
  let companyFactory: CompanyFactory
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, TransferFactory, CompanyFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    transferFactory = moduleRef.get(TransferFactory)
    userFactory = moduleRef.get(UserFactory)
    companyFactory = moduleRef.get(CompanyFactory)

    await app.init()
  })

  test('[GET] /transfer/name', async () => {
    const driver = await userFactory.makePrismaUser()
    const company = await companyFactory.makePrismaCompany()

    const transfer = await transferFactory.makePrismaTransfer({
      driverId: driver.id,
      companyId: company.id,
      name: 'Carro 1',
    })

    const nameTransfer = transfer.name
    const response = await request(app.getHttpServer())
      .get(`/transfer/${nameTransfer}`)
      .send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      transfers: expect.arrayContaining([
        expect.objectContaining({
          name: 'Carro 1',
        }),
      ]),
    })
  })
})
