import { Load } from '../../enterprise/entities/load'

export abstract class LoadRepository {
  abstract create(load: Load): Promise<void>
  abstract findById(id: string): Promise<Load | null>
  abstract delete(item: Load): Promise<void>
}
