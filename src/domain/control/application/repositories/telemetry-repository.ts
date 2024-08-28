import { Telemetry } from '../../enterprise/entities/telemetry'

export abstract class TruckTelemetryRepository {
  abstract create(telemetry: Telemetry): Promise<void>
  abstract findById(id: string): Promise<Telemetry | null>
  abstract delete(item: Telemetry): Promise<void>
}
