import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { UserCPF } from '../../enterprise/entities/value-objects/user-cpf'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AlreadyExistsError } from './errors/already-exist-error'

interface CreateUserRequest {
  cpf: UserCPF
  name: string
  address: string
  email: string
  cep: string
  birth: string
  phone: string
  password: string
  companyId?: string
}

type CreateUserResponse = Either<
  AlreadyExistsError,
  {
    user: User
  }
>

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    cpf, // unique
    name,
    cep,
    birth,
    password,
    address,
    email, // unique
    phone,
    companyId,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const cpfAlreadyExists = await this.userRepository.findByCPF(cpf.value)

    if (cpfAlreadyExists) {
      return left(new AlreadyExistsError(cpf.value))
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(email)

    if (emailAlreadyExists) {
      return left(new AlreadyExistsError(email))
    }

    const user = User.create({
      cpf,
      name,
      cep,
      birth,
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
