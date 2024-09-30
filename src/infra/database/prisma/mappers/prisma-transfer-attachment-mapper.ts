import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { TransferAttachment } from '@/domain/control/enterprise/entities/transfer-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaTransferAttachmentMapper {
  static toDomain(raw: PrismaAttachment): TransferAttachment {
    if (!raw.transferId) {
      throw new Error('Invalid attachment type.')
    }

    return TransferAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        transferId: new UniqueEntityID(raw.transferId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrismaUpdateMany(
    attachments: TransferAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        transferId: attachments[0].transferId.toString(),
      },
    }
  }
}
