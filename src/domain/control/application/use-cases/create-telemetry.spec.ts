import { InMemoryTruckTelemetryRepository } from 'test/repositories/in-memory-telemetry-repository'
import { CreateTelemetryUseCase } from './create-telemetry'
import { LocationTruck } from '../../enterprise/entities/value-objects/locationTruck'

let inMemoryTruckTelemetryRepository: InMemoryTruckTelemetryRepository
let sut: CreateTelemetryUseCase

describe('Create telemetry for a truck', () => {
  beforeEach(() => {
    inMemoryTruckTelemetryRepository = new InMemoryTruckTelemetryRepository()
    sut = new CreateTelemetryUseCase(inMemoryTruckTelemetryRepository)
  })
  it('Should be able create a avaiable truck', async () => {
    const result = await sut.execute({
      bends: 28,
      braking: 3,
      engineTemperature: 12,
      fuel: 50,
      ignition: true,
      location: LocationTruck.create('3'),
      speed: 79,
    })

    expect(result.value?.telemetry.bends).toEqual(28)
    expect(result.value?.telemetry.location.value).toEqual('3')
    expect(result.value).toBeTypeOf('object')
    expect(result.value?.telemetry).toBeTruthy()
  })
})

test('create a truck', async () => {})
