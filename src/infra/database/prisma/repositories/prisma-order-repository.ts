import { OrderRepository } from '@/domain/control/application/repositories/order-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'
import { Order } from '@/domain/control/enterprise/entities/order'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { OrderWithRelation } from '@/domain/control/enterprise/entities/order-with-relation'

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(
    private prisma: PrismaService,
    // private cache: CacheRepository,
  ) {}

  async findById(id: string): Promise<Order | null> {
    // Alterado de OrderWithRelation para Order
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        item: true,
        user: true,
        transfer: true,
      },
    })
    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomain(order) // Alterado para retornar um Order
  }

  async findByIdWithRelation(id: string): Promise<OrderWithRelation | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        item: true,
        user: true,
        transfer: true,
      },
    })
    if (!order) {
      return null
    }

    return PrismaOrderMapper.toDomainWithRelation(order)
  }

  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.create({
      data,
    })
  }

  async delete(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await this.prisma.order.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toPrisma(order)

    await Promise.all([
      this.prisma.order.update({
        where: {
          id: data.id,
        },
        data,
      }),
    ])
  }

  async findManyByName(
    name: string,
    { page }: PaginationParams,
  ): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
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

    return orders.map(PrismaOrderMapper.toDomain)
  }
}
