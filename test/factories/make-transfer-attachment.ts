import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  TransferAttachment,
  TransferAttachmentProps,
} from '@/domain/control/enterprise/entities/transfer-attachment'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeTransferAttachment(
  override: Partial<TransferAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const transferAttachment = TransferAttachment.create(
    {
      transferId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return transferAttachment
}
@Injectable()
export class TransferAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaTransferAttachment(
    data: Partial<TransferAttachmentProps> = {},
  ): Promise<TransferAttachment> {
    const transferAttachment = makeTransferAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: transferAttachment.attachmentId.toString(),
      },
      data: {
        transferId: transferAttachment.transferId.toString(),
      },
    })

    return transferAttachment
  }
}
