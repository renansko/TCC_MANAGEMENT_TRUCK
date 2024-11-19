import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { WrongCredentialsError } from './errors/wrong-credencials-error'
import { UserRepository } from '../repositories/user-repository'
import { HasherCompare } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encrypter'
import { NotFoundError } from './errors/not-found-error'

interface AuthenticateClientUseCaseRequest {
  email: string
  password: string
}

type AuthenticateClientUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateClientUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashCompare: HasherCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateClientUseCaseRequest): Promise<AuthenticateClientUseCaseResponse> {
    const client = await this.userRepository.findByEmail(email)

    if (!client) {
      return left(new NotFoundError(email))
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      client.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: client.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
