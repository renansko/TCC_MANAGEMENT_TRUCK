import { TransferAttachment } from '../../enterprise/entities/transfer-attachment'

export abstract class TransferAttachmentRepository {
  abstract createMany(attachments: TransferAttachment[]): Promise<void>
  abstract deleteMany(attachments: TransferAttachment[]): Promise<void>
  abstract findManyByTransferId(
    transferId: string,
  ): Promise<TransferAttachment[]>

  abstract deleteManyByTransferId(transferId: string): Promise<void>
}
