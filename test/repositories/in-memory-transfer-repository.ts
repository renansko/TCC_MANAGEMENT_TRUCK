import { TransferRepository } from '@/domain/control/application/repositories/transfer-repository'
import { Transfer } from '@/domain/control/enterprise/entities/transfer'

export class InMemoryTransferRepository implements TransferRepository {
  public items: Transfer[] = []

  async create(transfer: Transfer) {
    this.items.push(transfer)
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
