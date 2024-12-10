import { Telemetry } from '../../enterprise/entities/telemetry'

export abstract class TelemetryRepository {
  abstract create(telemetry: Telemetry): Promise<void>
  abstract findById(id: string): Promise<Telemetry | null>
  abstract delete(telemetry: Telemetry): Promise<void>
  abstract save(telemetry: Telemetry): Promise<void>
  abstract findByTruckId(transferId: string): Promise<Telemetry[]>
}
