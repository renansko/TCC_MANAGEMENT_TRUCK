import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { UserFactory } from 'test/factories/make-user'
import { CompanyFactory } from 'test/factories/make-company'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { UserAttachmentFactory } from 'test/factories/make-user-attatchment'

describe('Edit user (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let attachmentFactory: AttachmentFactory
  let companyFactory: CompanyFactory
  let userAttachmentFactory: UserAttachmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UserFactory,
        AttachmentFactory,
        UserAttachmentFactory,
        CompanyFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    userFactory = moduleRef.get(UserFactory)
    companyFactory = moduleRef.get(CompanyFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    userAttachmentFactory = moduleRef.get(UserAttachmentFactory)
    await app.init()
  })

  test('[POST] /users/:id', async () => {
    const user = await userFactory.makePrismaUser({})
    const company = await companyFactory.makePrismaCompany({})

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()
    const attachment3 = await attachmentFactory.makePrismaAttachment()

    await userAttachmentFactory.makePrismaUserAttachment({
      attachmentId: attachment1.id,
      userId: user.id,
    })

    await userAttachmentFactory.makePrismaUserAttachment({
      attachmentId: attachment2.id,
      userId: user.id,
    })

    const userId = user.id.toString()
    const response = await request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send({
        name: 'User Teste',
        userId: 'user-1',
        companyId: company.id.toString(),
        cpf: '12345678912',
        address: 'Address test',
        password: 'password',
        email: 'test@test.com',
        cep: '28377450',
        birth: '02/10/2003',
        phone: '(41) 99923-1234',
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      })
    expect(response.statusCode).toBe(204)

    const userOnDataBase = await prisma.user.findFirst({
      where: {
        name: 'User Teste',
      },
    })

    expect(userOnDataBase).toBeTruthy()

    const attachmentOnDataBase = await prisma.attachment.findMany({
      where: {
        userId: userOnDataBase?.id,
      },
    })
    expect(attachmentOnDataBase).toHaveLength(2)
    expect(attachmentOnDataBase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: attachment1.id.toString(),
        }),
        expect.objectContaining({
          id: attachment3.id.toString(),
        }),
      ]),
    )
  })
})
