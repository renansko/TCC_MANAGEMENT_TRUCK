import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-foud-error'
import { UserRepository } from '../repositories/user-repository'
import { Injectable } from '@nestjs/common'

interface DeleteUserRequest {
  userId: string
}

type DeleteUserResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.userRepository.delete(user)

    return right(null)
  }
}
