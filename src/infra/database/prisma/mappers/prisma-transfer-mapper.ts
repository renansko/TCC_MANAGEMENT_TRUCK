import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Transfer } from '@/domain/control/enterprise/entities/transfer'
import { Transfer as PrismaTransfer, Prisma } from '@prisma/client'

export class PrismaTransferMapper {
  static toDomain(raw: PrismaTransfer): Transfer {
    return Transfer.create(
      {
        name: raw.name,
        plate: raw.plate,
        model: raw.model,
        companyId: new UniqueEntityID(raw.companyId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(transfer: Transfer): Prisma.TransferUncheckedCreateInput {
    return {
      name: transfer.name,
      model: transfer.model,
      companyId: transfer.companyId.toString(),
      plate: transfer.plate,
      createdAt: transfer.createdAt,
      updatedAt: transfer.updatedAt,
    }
  }
}
