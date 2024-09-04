import { Transfer } from '../../enterprise/entities/transfer'

export abstract class TransferRepository {
  abstract create(transfer: Transfer): Promise<void>
  abstract findById(id: string): Promise<Transfer | null>
  abstract delete(item: Transfer): Promise<void>
}
