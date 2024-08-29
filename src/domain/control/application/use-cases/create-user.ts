import { Either, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { UserCPF } from '../../enterprise/entities/value-objects/user-cpf'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateUserRequest {
  cpf: UserCPF
  name: string
  address: string
  email: string
  phone: string
  password: string
  companyId?: string
}

type CreateUserResponse = Either<
  null,
  {
    user: User
  }
>

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    cpf,
    name,
    password,
    address,
    email,
    phone,
    companyId,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = User.create({
      cpf,
      name,
      password,
      address,
      email,
      phone,
      companyId: new UniqueEntityID(companyId),
    })

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
