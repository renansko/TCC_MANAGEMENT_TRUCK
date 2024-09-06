import { TransferAttachmentRepository } from '@/domain/control/application/repositories/transfer-attachment-repository'
import { TransferAttachment } from '@/domain/control/enterprise/entities/transfer-attachment'

export class InMemoryTransferAttachmentRepository
  implements TransferAttachmentRepository
{
  public items: TransferAttachment[] = []
  async createMany(attachments: TransferAttachment[]) {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: TransferAttachment[]) {
    const transferAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.items = transferAttachments
  }

  async findManyByTransferId(transferId: string) {
    const transferAttachment = this.items.filter(
      (item) => item.transferId.toString() === transferId,
    )

    return transferAttachment
  }

  async deleteManyByTransferId(transferId: string) {
    const transferAttachments = this.items.filter(
      (item) => item.transferId.toString() !== transferId,
    )

    this.items = transferAttachments
  }
}
