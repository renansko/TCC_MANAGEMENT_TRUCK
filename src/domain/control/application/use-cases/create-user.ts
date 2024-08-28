import { Either, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { UserCPF } from '../../enterprise/entities/value-objects/UserCPF'

interface CreateUserRequest {
  cpf: UserCPF
  name: string
  address: string
  email: string
  phone: string
  password: string
}

type CreateUserResponse = Either<
  null,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    cpf,
    name,
    password,
    address,
    email,
    phone,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = User.create({
      cpf,
      name,
      password,
      address,
      email,
      phone,
    })

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
