import { WatchedList } from '@/core/entities/watched-list'
import { TransferAttachment } from './transfer-attachment'

export class TransferAttachmentList extends WatchedList<TransferAttachment> {
  compareItems(a: TransferAttachment, b: TransferAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
