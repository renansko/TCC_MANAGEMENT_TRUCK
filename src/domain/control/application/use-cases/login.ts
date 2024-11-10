import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '../../enterprise/entities/order'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user-repository'
import { NotFoundError } from './errors/not-found-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

interface LoginRequest {
  email: string
  password: string
}

type LoginResponse = Either<
  NotFoundError,
  {
    token: string
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const token = ''
    return right({
      token,
    })
  }
}
