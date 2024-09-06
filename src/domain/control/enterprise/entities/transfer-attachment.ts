import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface TransferAttachmentProps {
  transferId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class TransferAttachment extends Entity<TransferAttachmentProps> {
  get transferId() {
    return this.props.transferId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: TransferAttachmentProps, id?: UniqueEntityID) {
    const transferAttachment = new TransferAttachment(props, id)

    return transferAttachment
  }
}
