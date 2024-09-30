import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { TransferAttachmentRepository } from '@/domain/control/application/repositories/transfer-attachment-repository'
import { TransferAttachment } from '@/domain/control/enterprise/entities/transfer-attachment'
import { PrismaTransferAttachmentMapper } from '../mappers/prisma-transfer-attachment-mapper'

@Injectable()
export class PrismaTransferAttachmentsRepository
  implements TransferAttachmentRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByTransferId(
    transferId: string,
  ): Promise<TransferAttachment[]> {
    const transferAttachment = await this.prisma.attachment.findMany({
      where: {
        transferId,
      },
    })

    return transferAttachment.map(PrismaTransferAttachmentMapper.toDomain)
  }

  async deleteManyByTransferId(transferId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        transferId,
      },
    })
  }

  async createMany(attachments: TransferAttachment[]) {
    if (attachments.length === 0) {
      return
    }

    const data = PrismaTransferAttachmentMapper.toPrismaUpdateMany(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: TransferAttachment[]) {
    if (attachments.length === 0) {
      return
    }
    const attachmentIds = attachments.map((attachment) => {
      return attachment.id.toString()
    })

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentIds,
        },
      },
    })
  }
}
