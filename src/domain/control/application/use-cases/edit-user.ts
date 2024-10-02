import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserCPF } from '../../enterprise/entities/value-objects/user-cpf'
import { UserAttachmentRepository } from '../repositories/user-attachment-repository'
import { UserAttachmentList } from '../../enterprise/entities/user-attachmenmt-list'
import { UserAttachment } from '../../enterprise/entities/user-attachment'

interface EditUserUseCaseRequest {
  userId: string
  name: string
  cpf: UserCPF
  address: string
  password: string
  email: string
  cep: string
  birth: string
  phone: string
  attachments: string[]
  companyId?: string
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class EditUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private userAttachmentRepository: UserAttachmentRepository,
  ) {}

  async execute({
    name,
    cpf,
    address,
    password,
    email,
    cep,
    birth,
    phone,
    attachments,
    companyId,
    userId,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const currentUserAttachments =
      this.userAttachmentRepository.findManyByUserId(userId)
    const userAttachmentList = new UserAttachmentList(
      await currentUserAttachments,
    )

    const userAttachment = attachments.map((attachmentId) => {
      return UserAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        userId: new UniqueEntityID(userId),
      })
    })

    userAttachmentList.update(userAttachment)

    user.companyId = companyId ? new UniqueEntityID(companyId) : null
    user.name = name
    user.cpf = cpf
    user.address = address
    user.password = password
    user.email = email
    user.cep = cep
    user.birth = birth
    user.phone = phone
    user.attachments = userAttachmentList

    await this.userRepository.save(user)

    return right({
      user,
    })
  }
}
