import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  MethodNotAllowedException,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { EditOrderUseCase } from '@/domain/control/application/use-cases/edit-order'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

const editOrderBodySchema = z.object({
  name: z.string(),
  status: z.string(),
  deliveryAddress: z.string(),
  dateRequested: z.coerce.date(),
  dateDelivery: z.coerce.date(),
  itemId: z.string().uuid(),
  userId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(editOrderBodySchema)

type EditOrderBodySchema = z.infer<typeof editOrderBodySchema>

@Controller('/order/:id')
export class EditOrderController {
  constructor(private editOrder: EditOrderUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: EditOrderBodySchema,
    @Param('id') orderId: string,
  ) {
    const {
      itemId,
      userId,
      name,
      deliveryAddress,
      dateDelivery,
      dateRequested,
      status,
    } = body
    const result = await this.editOrder.execute({
      orderId,
      userId,
      itemId,
      deliveryAddress,
      name,
      dateDelivery,
      dateRequested,
      status,
    })
    if (result.isLeft()) {
      const error = result.value
      switch (result.value.constructor) {
        case NotAllowedError:
          throw new MethodNotAllowedException(error.message)
        case ResourceNotFoundError:
          throw new ForbiddenException(error.message)
        default:
          throw new BadRequestException()
      }
    }
    return { order: result.value.order }
  }
}
