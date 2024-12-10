import { Telemetry } from '@/domain/control/enterprise/entities/telemetry'

export class TelemetryPresenter {
  static toHTTP(telemetry: Telemetry) {
    return {
      id: telemetry.id.toString(),
      speed: telemetry.speed,
      braking: telemetry.braking,
      bends: telemetry.bends,
      fuel: telemetry.fuel,
      ignition: telemetry.ignition,
      createdAt: telemetry.createdAt,
      updatedAt: telemetry.updatedAt,
    }
  }
}
