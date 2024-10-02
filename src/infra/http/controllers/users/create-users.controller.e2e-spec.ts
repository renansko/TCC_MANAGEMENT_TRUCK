import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { CompanyFactory } from 'test/factories/make-company'
describe('Create Users', () => {
  let app: INestApplication
  let prisma: PrismaService
  let attachmentFactory: AttachmentFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [CompanyFactory, PrismaService, AttachmentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    attachmentFactory = moduleRef.get(AttachmentFactory)

    await app.init()
  })
  it('[POST] /user', async () => {
    const attachment = await attachmentFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'João da Silva',
        cpf: '123.456.789-00',
        address: 'Rua Exemplo, 123',
        password: 'senha123',
        email: 'joao@exemplo.com',
        cep: '12345-678',
        birth: '1990-01-01',
        phone: '(11) 98765-4321',
        attachments: [attachment.id.toString()],
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
