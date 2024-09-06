import { AttachmentRepository } from '@/domain/control/application/repositories/attachment-repository'
import { Attachment } from '@/domain/control/enterprise/entities/attachment'

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: Attachment[] = []
  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}
