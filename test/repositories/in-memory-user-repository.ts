import { UserRepository } from '@/domain/control/application/repositories/user-repository'
import { User } from '@/domain/control/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

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
  }
}
