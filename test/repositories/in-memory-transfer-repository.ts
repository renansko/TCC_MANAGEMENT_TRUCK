import { DomainEvents } from '@/core/events/domain-events'
import { TransferAttachmentRepository } from '@/domain/control/application/repositories/transfer-attachment-repository'
import { TransferRepository } from '@/domain/control/application/repositories/transfer-repository'
import { Transfer } from '@/domain/control/enterprise/entities/transfer'

export class InMemoryTransferRepository implements TransferRepository {
  public items: Transfer[] = []

  constructor(
    private transferAttachmentsRepository: TransferAttachmentRepository,
  ) {}

  async findByPlate(plate: string): Promise<Transfer | null> {
    const transfer = this.items.find((item) => item.plate === plate)

    if (!transfer) {
      return null
    }

    return transfer
  }

  async create(transfer: Transfer) {
    this.items.push(transfer)

    await this.transferAttachmentsRepository.createMany(
      transfer.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(transfer.id)
  }

  async findById(id: string) {
    const transfer = this.items.find((item) => item.id.toString() === id)

    if (!transfer) {
      return null
    }

    return transfer
  }

  async delete(transfer: Transfer) {
    const transferIndex = this.items.findIndex(
      (item) => item.id === transfer.id,
    )

    this.items.splice(transferIndex, 1)
  }
}
