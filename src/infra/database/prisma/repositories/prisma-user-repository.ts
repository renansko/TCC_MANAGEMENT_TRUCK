import { UserRepository } from '@/domain/control/application/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { User } from '@/domain/control/enterprise/entities/user'
import { UserAttachmentRepository } from '@/domain/control/application/repositories/user-attachment-repository'
import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaService,
    private userAttachmentsRepository: UserAttachmentRepository,
    // private cache: CacheRepository,
  ) {}

  async findByCPF(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })

    await this.userAttachmentsRepository.createMany(user.attachments.getItems())

    DomainEvents.dispatchEventsForAggregate(user.id)
  }

  async delete(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await Promise.all([
      this.prisma.user.update({
        where: {
          id: data.id,
        },
        data,
      }),

      this.userAttachmentsRepository.createMany(user.attachments.getItems()),

      this.userAttachmentsRepository.deleteMany(
        user.attachments.getRemovedItems(),
      ),
    ])

    DomainEvents.dispatchEventsForAggregate(user.id)
  }

  async findManyByName(
    name: string,
    { page }: PaginationParams,
  ): Promise<User[]> {
    const users = await this.prisma.user.findMany({
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

    return users.map(PrismaUserMapper.toDomain)
  }
}
