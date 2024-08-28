import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Telemetry,
  telemetryProps,
} from '@/domain/control/enterprise/entities/telemetry'
import { LocationTruck } from '@/domain/control/enterprise/entities/value-objects/locationTruck'

export function makeTelemetry(
  override: Partial<telemetryProps> = {},
  id?: UniqueEntityID,
) {
  const telemetry = Telemetry.create(
    {
      speed: 80,
      fuel: 120,
      ignition: true,
      location: LocationTruck.createFromText('curitiba'),
      engineTemperature: 12,
      braking: 42,
      bends: 2,
      ...override,
    },
    id,
  )

  return telemetry
}
