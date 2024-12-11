import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { DeleteTransferUseCase } from '@/domain/control/application/use-cases/delete-transfer'
import { Public } from '@/infra/auth/public'

@Controller('/transfer/:id')
export class DeleteTransferController {
  constructor(private deleteTransfer: DeleteTransferUseCase) {}

  @Public()
  @Delete()
  @HttpCode(200)
  async handle(
    @Param('id')
    transferId: string,
  ) {
    const result = await this.deleteTransfer.execute({
      transferId,
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
