import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Item } from '@/domain/control/enterprise/entities/item'
import { Item as PrismaItem, Prisma } from '@prisma/client'

export class PrismaItemMapper {
  static toDomain(raw: PrismaItem): Item {
    return Item.create(
      {
        name: raw.name,
        description: raw.description,
        quantity: raw.quantity.toNumber(),
        amount: raw.amount.toNumber(),
        weight: raw.weight.toNumber(),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(item: Item): Prisma.ItemUncheckedCreateInput {
    return {
      id: item.id.toString(),
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      amount: item.amount,
      weight: item.weight,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }
  }
}
