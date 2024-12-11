import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { EditUserUseCase } from '@/domain/control/application/use-cases/edit-user'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { UserCPF } from '@/domain/control/enterprise/entities/value-objects/user-cpf'
import { Public } from '@/infra/auth/public'

const editUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(11),
  address: z.string(),
  password: z.string(),
  email: z.string().email(),
  phone: z.string(),
  cep: z.string(),
  birth: z.string(),
  companyId: z.string().uuid().optional(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(editUserBodySchema)

type EditUserBodySchema = z.infer<typeof editUserBodySchema>

@Controller('/user/:id')
export class EditUserController {
  constructor(private editUser: EditUserUseCase) {}
  @Public()
  @Put()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: EditUserBodySchema,
    @Param('id') userId: string,
  ) {
    const {
      name,
      password,
      address,
      email,
      cep,
      phone,
      birth,
      cpf,
      companyId,
      attachments,
    } = body
    const result = await this.editUser.execute({
      name,
      password,
      address,
      email,
      cep,
      phone,
      birth,
      cpf: UserCPF.create(cpf),
      attachments,
      userId,
      companyId,
    })
    if (result.isLeft()) {
      const error = result.value
      switch (result.value.constructor) {
        case ResourceNotFoundError:
          throw new ForbiddenException(error.message)
        default:
          throw new BadRequestException()
      }
    }

    return result.value.user
  }
}
