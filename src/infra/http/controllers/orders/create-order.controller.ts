import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateOrderUseCase } from '@/domain/control/application/use-cases/create-order'
import { NotFoundError } from '@/domain/control/application/use-cases/errors/not-found-error'

const createOrderBodySchema = z.object({
  itemId: z.string().uuid(),
  userId: z.string().uuid(),
  dateRequested: z.coerce.date(),
  dateDelivery: z.coerce.date(),
  deliveryAddress: z.string(),
  status: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema)

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

@Controller('/order')
export class CreateOrderController {
  constructor(private createOrder: CreateOrderUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe)
    body: CreateOrderBodySchema,
  ) {
    const {
      itemId,
      userId,
      dateRequested,
      dateDelivery,
      deliveryAddress,
      status,
    } = body

    const result = await this.createOrder.execute({
      itemId,
      userId,
      dateRequested,
      dateDelivery,
      deliveryAddress,
      status,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NotFoundError:
          throw new ForbiddenException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
