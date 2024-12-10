import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Telemetry } from '@/domain/control/enterprise/entities/telemetry'
import { Telemetry as PrismaTelemetry, Prisma } from '@prisma/client'

export class PrismaTelemetryMapper {
  static toDomain(raw: PrismaTelemetry): Telemetry {
    return Telemetry.create(
      {
        speed: raw.speed.toNumber(),
        braking: raw.braking,
        bends: raw.bends,
        fuel: raw.fuel.toNumber(),
        ignition: raw.ignition,
        transferId: new UniqueEntityID(),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(telemetry: Telemetry): Prisma.TelemetryUncheckedCreateInput {
    return {
      id: telemetry.id.toString(),
      speed: telemetry.speed,
      braking: telemetry.braking,
      bends: telemetry.bends,
      fuel: telemetry.fuel,
      ignition: telemetry.ignition,
      transferId: telemetry.transferId.toString(),
      createdAt: telemetry.createdAt,
      updatedAt: telemetry.updatedAt,
    }
  }
}
