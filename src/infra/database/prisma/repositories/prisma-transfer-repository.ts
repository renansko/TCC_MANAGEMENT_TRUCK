import { TransferRepository } from '@/domain/control/application/repositories/transfer-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaTransferMapper } from '../mappers/prisma-transfer-mapper'
import { Transfer } from '@/domain/control/enterprise/entities/transfer'

@Injectable()
export class PrismaTransferRepository implements TransferRepository {
  constructor(
    private prisma: PrismaService,
    // private transferAttachmentsRepository: TransferAttachmentRepository,
    // private cache: CacheRepository,
  ) {}

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
  }

  async delete(transfer: Transfer): Promise<void> {
    const data = PrismaTransferMapper.toPrisma(transfer)

    await this.prisma.transfer.delete({
      where: {
        id: data.id,
      },
    })
  }
}
