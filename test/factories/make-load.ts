import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Transfer,
  TransferProps,
} from '@/domain/control/enterprise/entities/transfer'
import { faker } from '@faker-js/faker'

export function makeTransfer(
  override: Partial<TransferProps> = {},
  id?: UniqueEntityID,
) {
  const transfer = Transfer.create(
    {
      name: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      plate: faker.vehicle.vrm(),
      driverId: new UniqueEntityID(),
      companyId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return transfer
}
