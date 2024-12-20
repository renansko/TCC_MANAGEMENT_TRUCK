import { PaginationParams } from '@/core/repositories/pagination-params'
import { Transfer } from '../../enterprise/entities/transfer'

export abstract class TransferRepository {
  abstract findByPlate(plate: string): Promise<Transfer | null>
  abstract create(transfer: Transfer): Promise<void>
  abstract findById(id: string): Promise<Transfer | null>
  abstract delete(transfer: Transfer): Promise<void>
  abstract save(transfer: Transfer): Promise<void>
  abstract findManyByName(
    name: string,
    params: PaginationParams,
  ): Promise<Transfer[]>

  abstract GetTransfersUseCase(
    params: PaginationParams,
  ): Promise<Transfer | null>
}
