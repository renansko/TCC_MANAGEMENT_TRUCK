import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserAttachmentRepository } from '@/domain/control/application/repositories/user-attachment-repository'
import { UserAttachment } from '@/domain/control/enterprise/entities/user-attachment'
import { PrismaUserAttachmentMapper } from '../mappers/prisma-user-attachment-mapper'

@Injectable()
export class PrismaUserAttachmentsRepository
  implements UserAttachmentRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByUserId(userId: string): Promise<UserAttachment[]> {
    const userAttachment = await this.prisma.attachment.findMany({
      where: {
        userId,
      },
    })

    return userAttachment.map(PrismaUserAttachmentMapper.toDomain)
  }

  async deleteManyByUserId(userId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        userId,
      },
    })
  }

  async createMany(attachments: UserAttachment[]) {
    if (attachments.length === 0) {
      return
    }

    const data = PrismaUserAttachmentMapper.toPrismaUpdateMany(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: UserAttachment[]) {
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
