import { PaginationParams } from '@/core/repositories/pagination-params'
import { User } from '../../enterprise/entities/user'

export abstract class UserRepository {
  abstract findByCPF(cpf: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(user: User): Promise<void>
  abstract findById(id: string): Promise<User | null>
  abstract delete(user: User): Promise<void>
  abstract save(user: User): Promise<void>
  abstract findManyByName(
    name: string,
    params: PaginationParams,
  ): Promise<User[]>
}
