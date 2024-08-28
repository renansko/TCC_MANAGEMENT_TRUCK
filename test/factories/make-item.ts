import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Item, ItemProps } from '@/domain/control/enterprise/entities/item'

export function makeItem(
  override: Partial<ItemProps> = {},
  id?: UniqueEntityID,
) {
  const item = Item.create(
    {
      amount: 50.5,
      description: faker.lorem.sentence(5),
      name: 'Tabua',
      quantity: 1000,
      type: 'wood',
      ...override,
    },
    id,
  )

  return item
}
