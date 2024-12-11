import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { DeleteUserUseCase } from '@/domain/control/application/use-cases/delete-user'
import { Public } from '@/infra/auth/public'

@Controller('/user/:id')
export class DeleteUserController {
  constructor(private deleteUser: DeleteUserUseCase) {}

  @Public()
  @Delete()
  @HttpCode(200)
  async handle(
    @Param('id')
    userId: string,
  ) {
    const result = await this.deleteUser.execute({
      userId,
    })
    if (result.isLeft()) {
      const error = result.value

      switch (result.value.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value
  }
}
