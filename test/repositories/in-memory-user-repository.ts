import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { UserAttachmentRepository } from '@/domain/control/application/repositories/user-attachment-repository'
import { UserRepository } from '@/domain/control/application/repositories/user-repository'
import { User } from '@/domain/control/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  constructor(private userAttachmentsRepository: UserAttachmentRepository) {}

  async findManyByName(
    name: string,
    { page }: PaginationParams,
  ): Promise<User[]> {
    const user = this.items
      .filter((user) => user.name.toString() === name)
      .splice((page - 1) * 20, page * 20)

    return user
  }

  async findByCPF(cpf: string): Promise<User | null> {
    const user = this.items.find((item) => item.cpf.value === cpf)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User) {
    this.items.push(user)

    await this.userAttachmentsRepository.createMany(user.attachments.getItems())

    DomainEvents.dispatchEventsForAggregate(user.id)
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async delete(user: User) {
    const userIndex = this.items.findIndex((item) => item.id === user.id)

    this.items.splice(userIndex, 1)

    this.userAttachmentsRepository.deleteManyByUserId(user.id.toString())
  }

  async save(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user

    await this.userAttachmentsRepository.createMany(
      user.attachments.getNewItems(),
    )

    await this.userAttachmentsRepository.deleteMany(
      user.attachments.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(user.id)
  }
}
