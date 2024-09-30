import { Transfer } from '@/domain/control/enterprise/entities/transfer'

export class TransferPresenter {
  static toHTTP(transfer: Transfer) {
    return {
      id: transfer.id.toString(),
      name: transfer.name,
      model: transfer.model,
      plate: transfer.plate,
      attachments: transfer.attachments,
      companyId: transfer.companyId,
      driverId: transfer.driverId,
      createdAt: transfer.createdAt,
      updatedAt: transfer.updatedAt,
    }
  }
}
