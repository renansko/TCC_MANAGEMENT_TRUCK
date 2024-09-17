import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { DeleteItemsUseCase } from '@/domain/control/application/use-cases/delete-items-to-load'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

@Controller('/item/:id')
export class DeleteItemController {
  constructor(private deleteItem: DeleteItemsUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(
    @Param('id')
    itemId: string,
  ) {
    const result = await this.deleteItem.execute({
      itemId,
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
  }
}
