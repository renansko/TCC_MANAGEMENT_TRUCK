import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

interface FetchUsersUseCaseRequest {
  name: string
  page: number
}

type FetchUsersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    users: User[]
  }
>

@Injectable()
export class FetchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    page,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.userRepository.findManyByName(name, {
      page,
    })
    if (!users) {
      throw left(new ResourceNotFoundError())
    }

    return right({
      users,
    })
  }
}
