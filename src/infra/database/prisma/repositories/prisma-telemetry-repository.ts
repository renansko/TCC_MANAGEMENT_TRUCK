import { TelemetryRepository } from '@/domain/control/application/repositories/telemetry-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Telemetry } from '@/domain/control/enterprise/entities/telemetry'
import { PrismaTelemetryMapper } from '../mappers/prisma-telemetry-mapper'

@Injectable()
export class PrismaTelemetryRepository implements TelemetryRepository {
  constructor(
    private prisma: PrismaService,
    // private telemetryAttachmentsRepository: TelemetryAttachmentRepository,
    // private cache: CacheRepository,
  ) {}

  async save(telemetry: Telemetry): Promise<void> {
    const data = PrismaTelemetryMapper.toPrisma(telemetry)

    await Promise.all([
      this.prisma.telemetry.update({
        where: {
          id: data.id,
        },
        data,
      }),
    ])
  }

  async findByTruckId(transferId: string): Promise<Telemetry[]> {
    const telemetrys = await this.prisma.telemetry.findMany({
      where: {
        transferId,
      },
    })

    return telemetrys.map(PrismaTelemetryMapper.toDomain)
  }

  async findById(id: string): Promise<Telemetry | null> {
    const telemetry = await this.prisma.telemetry.findUnique({
      where: {
        id,
      },
    })

    if (!telemetry) {
      return null
    }

    return PrismaTelemetryMapper.toDomain(telemetry)
  }

  async create(telemetry: Telemetry): Promise<void> {
    const data = PrismaTelemetryMapper.toPrisma(telemetry)

    await this.prisma.telemetry.create({
      data,
    })
  }

  async delete(telemetry: Telemetry): Promise<void> {
    const data = PrismaTelemetryMapper.toPrisma(telemetry)

    await this.prisma.telemetry.delete({
      where: {
        id: data.id,
      },
    })
  }
}
