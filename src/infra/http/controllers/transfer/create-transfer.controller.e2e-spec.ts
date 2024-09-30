import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { CompanyFactory } from 'test/factories/make-company'
import { UserFactory } from 'test/factories/make-user'
describe('Create Transfers', () => {
  let app: INestApplication
  let prisma: PrismaService

  let companyFactory: CompanyFactory
  let userFactory: UserFactory
  let attachmentFactory: AttachmentFactory
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        CompanyFactory,
        UserFactory,
        PrismaService,
        AttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    companyFactory = moduleRef.get(CompanyFactory)
    userFactory = moduleRef.get(UserFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)

    await app.init()
  })
  it('[POST] /transfer', async () => {
    const company = await companyFactory.makePrismaCompany()
    const user = await userFactory.makePrismaUser()

    const attachment = await attachmentFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .post('/transfer')
      .send({
        name: 'Caminhão de Teste',
        model: 'Modelo XYZ',
        plate: 'ABC1234',
        companyId: company.id.toString(),
        driverId: user.id.toString(),
        attachmentIds: [attachment.id.toString()],
      })

    expect(response.statusCode).toBe(201)

    const transfersOnDatabase = await prisma.transfer.findUnique({
      where: {
        plate: 'ABC1234',
      },
    })

    expect(transfersOnDatabase).toBeTruthy()

    const attachmentOnDataBase = await prisma.attachment.findMany({
      where: {
        transferId: transfersOnDatabase?.id,
      },
    })

    expect(attachmentOnDataBase).toHaveLength(1)
  })
})
