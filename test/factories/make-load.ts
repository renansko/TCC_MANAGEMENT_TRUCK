import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Load, LoadProps } from '@/domain/control/enterprise/entities/load'

export function makeLoad(
  override: Partial<LoadProps> = {},
  id?: UniqueEntityID,
) {
  const load = Load.create(
    {
    itemsId: new UniqueEntityID(), // Lista de items
    type: 'dangerous',
    weight: 120,
    ...override,
    },
    id,
  )

  return load
}
