import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { UserCPF } from '../../enterprise/entities/value-objects/user-cpf'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AlreadyExistsError } from './errors/already-exist-error'
import { UserAttachment } from '../../enterprise/entities/user-attachment'
import { UserAttachmentList } from '../../enterprise/entities/user-attachmenmt-list'
import { hash } from 'bcryptjs'

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
  attachments: string[]
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
    attachments,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const cpfAlreadyExists = await this.userRepository.findByCPF(cpf.value)

    if (cpfAlreadyExists) {
      return left(new AlreadyExistsError(cpf.value))
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(email)

    if (emailAlreadyExists) {
      return left(new AlreadyExistsError(email))
    }

    const passwordHash = await hash(password, 6)

    const user = User.create({
      cpf,
      name,
      cep,
      birth,
      password: passwordHash,
      address,
      email,
      phone,
      companyId: new UniqueEntityID(companyId),
    })

    const userAttachment = attachments.map((attachmentId) => {
      return UserAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        userId: user.id,
      })
    })

    user.attachments = new UserAttachmentList(userAttachment)

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
