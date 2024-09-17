import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Item, ItemProps } from '@/domain/control/enterprise/entities/item'

export function makeItem(
  override: Partial<ItemProps> = {},
  id?: UniqueEntityID,
) {
  const item = Item.create(
    {
      amount: faker.number.float({ min: 1, max: 1000, precision: 0.01 }),
      description: faker.lorem.sentence(5),
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 10000 }),
      weight: faker.number.float({ min: 0.1, max: 1000, precision: 0.1 }),
      ...override,
    },
    id,
  )

  return item
}
