import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CompanyFactory } from 'test/factories/make-company'
import { UserFactory } from 'test/factories/make-user'
describe('Delete User', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let companyFactory: CompanyFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, CompanyFactory, PrismaService],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    userFactory = moduleRef.get(UserFactory)

    userFactory = moduleRef.get(UserFactory)
    companyFactory = moduleRef.get(CompanyFactory)

    await app.init()
  })
  it('[DELETE] /user/{id}', async () => {
    const company = await companyFactory.makePrismaCompany()

    const user = await userFactory.makePrismaUser({
      companyId: company.id,
    })

    const userId = user.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .send()
    expect(response.statusCode).toBe(204)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    expect(userOnDatabase).toBeNull()
  })
})
