import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Item, ItemProps } from '@/domain/control/enterprise/entities/item'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaItemMapper } from '@/infra/database/prisma/mappers/prisma-items-mapper'

export function makeItem(
  override: Partial<ItemProps> = {},
  id?: UniqueEntityID,
) {
  const item = Item.create(
    {
      name: faker.commerce.productName(),
      amount: faker.number.float({ min: 1, max: 1000, multipleOf: 0.01 }),
      description: faker.lorem.sentence(5),
      quantity: faker.number.int({ min: 1, max: 10000 }),
      weight: faker.number.float({ min: 0.1, max: 1000, multipleOf: 0.1 }),
      ...override,
    },
    id,
  )

  return item
}

@Injectable()
export class ItemFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaItem(data: Partial<ItemProps> = {}): Promise<Item> {
    const item = makeItem(data)

    await this.prisma.item.create({
      data: PrismaItemMapper.toPrisma(item),
    })

    return item
  }
}
