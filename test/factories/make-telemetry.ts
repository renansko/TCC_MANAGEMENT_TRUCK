import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Telemetry,
  telemetryProps,
} from '@/domain/control/enterprise/entities/telemetry'
import { LocationTruck } from '@/domain/control/enterprise/entities/value-objects/locationTruck'

import { faker } from '@faker-js/faker'

export function makeTelemetry(
  override: Partial<telemetryProps> = {},
  id?: UniqueEntityID,
) {
  const telemetry = Telemetry.create(
    {
      speed: faker.number.int({ min: 0, max: 120 }),
      fuel: faker.number.int({ min: 0, max: 200 }),
      ignition: faker.datatype.boolean(),
      location: LocationTruck.createFromText(faker.location.city()),
      engineTemperature: faker.number.int({ min: -20, max: 120 }),
      braking: faker.number.int({ min: 0, max: 100 }),
      bends: faker.number.int({ min: 0, max: 10 }),
      truckId: new UniqueEntityID(faker.string.uuid()),
      ...override,
    },
    id,
  )

  return telemetry
}
