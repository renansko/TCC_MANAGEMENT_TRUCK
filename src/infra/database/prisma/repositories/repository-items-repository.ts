import { ItemRepository } from '@/domain/control/application/repositories/item-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Item } from '@/domain/control/enterprise/entities/item'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { PrismaItemMapper } from '../mappers/prisma-items-mapper'

@Injectable()
export class PrismaItemRepository implements ItemRepository {
  constructor(
    private prisma: PrismaService,
    // private itemAttachmentsRepository: ItemAttachmentRepository,
    // private cache: CacheRepository,
  ) {}

  async save(item: Item): Promise<void> {
    const data = PrismaItemMapper.toPrisma(item)

    this.prisma.item.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findManyByName(
    name: string,
    { page }: PaginationParams,
  ): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
      where: {
        name,
      },
    })

    return items.map(PrismaItemMapper.toDomain)
  }

  async findById(id: string): Promise<Item | null> {
    const item = await this.prisma.item.findUnique({
      where: {
        id,
      },
    })

    if (!item) {
      return null
    }

    return PrismaItemMapper.toDomain(item)
  }

  async create(item: Item): Promise<void> {
    const data = PrismaItemMapper.toPrisma(item)

    await this.prisma.item.create({
      data,
    })
  }

  async delete(item: Item): Promise<void> {
    const data = PrismaItemMapper.toPrisma(item)

    await this.prisma.item.delete({
      where: {
        id: data.id,
      },
    })
  }
}
