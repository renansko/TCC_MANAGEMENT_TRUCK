import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserAttachment } from '@/domain/control/enterprise/entities/user-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaUserAttachmentMapper {
  static toDomain(raw: PrismaAttachment): UserAttachment {
    if (!raw.userId) {
      throw new Error('Invalid attachment type.')
    }

    return UserAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        userId: new UniqueEntityID(raw.userId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrismaUpdateMany(
    attachments: UserAttachment[],
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
        userId: attachments[0].userId.toString(),
      },
    }
  }
}
