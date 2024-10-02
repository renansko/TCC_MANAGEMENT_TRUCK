import { TransferRepository } from '@/domain/control/application/repositories/transfer-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaTransferMapper } from '../mappers/prisma-transfer-mapper'
import { Transfer } from '@/domain/control/enterprise/entities/transfer'
import { TransferAttachmentRepository } from '@/domain/control/application/repositories/transfer-attachment-repository'
import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaTransferRepository implements TransferRepository {
  constructor(
    private prisma: PrismaService,
    private transferAttachmentsRepository: TransferAttachmentRepository,
    // private cache: CacheRepository,
  ) {}

  async findByPlate(plate: string): Promise<Transfer | null> {
    const transfer = await this.prisma.transfer.findUnique({
      where: {
        plate,
      },
    })

    if (!transfer) {
      return null
    }

    return PrismaTransferMapper.toDomain(transfer)
  }

  async findById(id: string): Promise<Transfer | null> {
    const transfer = await this.prisma.transfer.findUnique({
      where: {
        id,
      },
    })

    if (!transfer) {
      return null
    }

    return PrismaTransferMapper.toDomain(transfer)
  }

  async create(transfer: Transfer): Promise<void> {
    const data = PrismaTransferMapper.toPrisma(transfer)

    await this.prisma.transfer.create({
      data,
    })

    await this.transferAttachmentsRepository.createMany(
      transfer.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(transfer.id)
  }

  async delete(transfer: Transfer): Promise<void> {
    const data = PrismaTransferMapper.toPrisma(transfer)

    await this.prisma.transfer.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(transfer: Transfer): Promise<void> {
    const data = PrismaTransferMapper.toPrisma(transfer)

    await Promise.all([
      this.prisma.transfer.update({
        where: {
          id: data.id,
        },
        data,
      }),

      this.transferAttachmentsRepository.createMany(
        transfer.attachments.getItems(),
      ),

      this.transferAttachmentsRepository.deleteMany(
        transfer.attachments.getRemovedItems(),
      ),
    ])

    DomainEvents.dispatchEventsForAggregate(transfer.id)
  }

  async findManyByName(
    name: string,
    { page }: PaginationParams,
  ): Promise<Transfer[]> {
    const transfers = await this.prisma.transfer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
      where: {
        name: {
          startsWith: name,
        },
      },
    })

    return transfers.map(PrismaTransferMapper.toDomain)
  }
}
