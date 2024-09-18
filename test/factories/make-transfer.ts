import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Transfer,
  TransferProps,
} from '@/domain/control/enterprise/entities/transfer'
import { PrismaTransferMapper } from '@/infra/database/prisma/mappers/prisma-transfer-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

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

@Injectable()
export class TransferFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaTransfer(
    data: Partial<TransferProps> = {},
  ): Promise<Transfer> {
    const transfer = makeTransfer(data)

    await this.prisma.transfer.create({
      data: PrismaTransferMapper.toPrisma(transfer),
    })

    return transfer
  }
}
