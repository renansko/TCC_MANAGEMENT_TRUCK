import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateUserUseCase } from '@/domain/control/application/use-cases/create-user'
import { UserCPF } from '@/domain/control/enterprise/entities/value-objects/user-cpf'
import { AlreadyExistsError } from '@/domain/control/application/use-cases/errors/already-exist-error'

const createUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(11),
  address: z.string(),
  password: z.string(),
  email: z.string().email(),
  phone: z.string(),
  cep: z.string(),
  birth: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@Controller('/user')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}
  // receber company Id
  @Post()
  async handle(
    @Body(bodyValidationPipe)
    body: CreateUserBodySchema,
  ) {
    const { name, password, address, email, cep, phone, birth, cpf } = body

    const result = await this.createUser.execute({
      name,
      password,
      address,
      email,
      cep,
      phone,
      birth,
      cpf: UserCPF.create(cpf),
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
