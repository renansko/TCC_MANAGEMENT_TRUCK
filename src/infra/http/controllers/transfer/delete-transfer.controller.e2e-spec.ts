import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CompanyFactory } from 'test/factories/make-company'
import { TransferFactory } from 'test/factories/make-transfer'
import { UserFactory } from 'test/factories/make-user'
describe('Delete Transfer', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let transferFactory: TransferFactory
  let companyFactory: CompanyFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [TransferFactory, UserFactory, CompanyFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    userFactory = moduleRef.get(UserFactory)

    transferFactory = moduleRef.get(TransferFactory)
    companyFactory = moduleRef.get(CompanyFactory)

    await app.init()
  })
  it('[DELETE] /transfer/{id}', async () => {
    const user = await userFactory.makePrismaUser()
    const company = await companyFactory.makePrismaCompany()

    const transfer = await transferFactory.makePrismaTransfer({
      driverId: user.id,
      companyId: company.id,
    })

    const transferId = transfer.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/transfer/${transferId}`)
      .send()
    expect(response.statusCode).toBe(204)

    const transferOnDatabase = await prisma.transfer.findMany({
      where: {
        driverId: user.id.toString(),
      },
    })

    expect(transferOnDatabase).toHaveLength(0)
  })
})
