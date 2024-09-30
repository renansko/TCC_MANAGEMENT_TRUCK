import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { TransferFactory } from 'test/factories/make-transfer'
import { CompanyFactory } from 'test/factories/make-company'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { TransferAttachmentFactory } from 'test/factories/make-transfer-attachment'

describe('Edit transfer (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let transferFactory: TransferFactory
  let companyFactory: CompanyFactory
  let attachmentFactory: AttachmentFactory
  let transferAttachmentFactory: TransferAttachmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        TransferFactory,
        CompanyFactory,
        AttachmentFactory,
        TransferAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    transferFactory = moduleRef.get(TransferFactory)
    companyFactory = moduleRef.get(CompanyFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    transferAttachmentFactory = moduleRef.get(TransferAttachmentFactory)
    await app.init()
  })

  test('[POST] /transfers/:id', async () => {
    const company = await companyFactory.makePrismaCompany()
    const companyId = company.id
    const transfer = await transferFactory.makePrismaTransfer({
      companyId,
    })

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()
    const attachment3 = await attachmentFactory.makePrismaAttachment()

    await transferAttachmentFactory.makePrismaTransferAttachment({
      attachmentId: attachment1.id,
      transferId: transfer.id,
    })

    await transferAttachmentFactory.makePrismaTransferAttachment({
      attachmentId: attachment2.id,
      transferId: transfer.id,
    })

    const transferId = transfer.id.toString()
    const response = await request(app.getHttpServer())
      .put(`/transfer/${transferId}`)
      .send({
        name: 'New name',
        model: 'New model',
        plate: 'new-plate',
        companyId: companyId.toString(),
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      })

    expect(response.statusCode).toBe(204)

    const transferOnDataBase = await prisma.transfer.findFirst({
      where: {
        name: 'New name',
      },
    })

    expect(transferOnDataBase).toBeTruthy()

    const attachmentOnDataBase = await prisma.attachment.findMany({
      where: {
        transferId: transferOnDataBase?.id,
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
