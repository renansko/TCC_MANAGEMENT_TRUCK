import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { DeleteOrderUseCase } from '@/domain/control/application/use-cases/delete-order'
import { Public } from '@/infra/auth/public'

@Controller('/order/:id')
export class DeleteOrderController {
  constructor(private deleteOrder: DeleteOrderUseCase) {}

  @Public()
  @Delete()
  @HttpCode(200)
  async handle(
    @Param('id')
    orderId: string,
  ) {
    const result = await this.deleteOrder.execute({
      orderId,
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
