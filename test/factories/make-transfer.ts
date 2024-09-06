import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Transfer,
  TransferProps,
} from '@/domain/control/enterprise/entities/transfer'

export function makeTransfer(
  override: Partial<TransferProps> = {},
  id?: UniqueEntityID,
) {
  const transfer = Transfer.create(
    {
      name: 'Pegout',
      attachment: 'url:img',
      model: 'Ratch',
      plate: 'ABC-CDB',
      driverId: new UniqueEntityID('2'),
      telemetryId: new UniqueEntityID('1'),
      companyId: new UniqueEntityID('1'),
      ...override,
    },
    id,
  )

  return transfer
}
