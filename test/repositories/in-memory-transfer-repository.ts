import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { TransferAttachmentRepository } from '@/domain/control/application/repositories/transfer-attachment-repository'
import { TransferRepository } from '@/domain/control/application/repositories/transfer-repository'
import { Transfer } from '@/domain/control/enterprise/entities/transfer'

export class InMemoryTransferRepository implements TransferRepository {
  public items: Transfer[] = []

  constructor(
    private transferAttachmentsRepository: TransferAttachmentRepository,
  ) {}

  async GetTransfersUseCase({ page }: PaginationParams): Promise<any | null> {
    const transfers = this.items.splice((page - 1) * 20, 20)
    return transfers.length > 0 ? transfers[0].props : null
  }

  async findManyByName(
    name: string,
    { page }: PaginationParams,
  ): Promise<Transfer[]> {
    const transfer = this.items
      .filter((transfer) => transfer.name.toString() === name)
      .splice((page - 1) * 20, page * 20)

    return transfer
  }

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

    this.transferAttachmentsRepository.deleteManyByTransferId(
      transfer.id.toString(),
    )
  }

  async save(transfer: Transfer) {
    const itemIndex = this.items.findIndex((item) => item.id === transfer.id)

    this.items[itemIndex] = transfer

    await this.transferAttachmentsRepository.createMany(
      transfer.attachments.getNewItems(),
    )

    await this.transferAttachmentsRepository.deleteMany(
      transfer.attachments.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(transfer.id)
  }
}
