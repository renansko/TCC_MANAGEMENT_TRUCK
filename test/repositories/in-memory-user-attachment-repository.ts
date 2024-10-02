import { UserAttachmentRepository } from '@/domain/control/application/repositories/user-attachment-repository'
import { UserAttachment } from '@/domain/control/enterprise/entities/user-attachment'

export class InMemoryUserAttachmentRepository
  implements UserAttachmentRepository
{
  public items: UserAttachment[] = []
  async createMany(attachments: UserAttachment[]) {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: UserAttachment[]) {
    const userAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.items = userAttachments
  }

  async findManyByUserId(userId: string) {
    const userAttachment = this.items.filter(
      (item) => item.userId.toString() === userId,
    )

    return userAttachment
  }

  async deleteManyByUserId(userId: string) {
    const userAttachments = this.items.filter(
      (item) => item.userId.toString() !== userId,
    )

    this.items = userAttachments
  }
}
