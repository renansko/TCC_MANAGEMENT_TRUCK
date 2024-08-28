import { Truck } from '../../enterprise/entities/truck'

export abstract class TruckRepository {
  abstract create(truck: Truck): Promise<void>
  abstract findById(id: string): Promise<Truck | null>
  abstract delete(item: Truck): Promise<void>
}
