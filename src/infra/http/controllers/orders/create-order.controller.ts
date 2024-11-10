import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateOrderUseCase } from '@/domain/control/application/use-cases/create-order'
import { NotFoundError } from '@/domain/control/application/use-cases/errors/not-found-error'

const createOrderBodySchema = z.object({
  name: z.string(),
  itemId: z.string().uuid(),
  userId: z.string().uuid(),
  transferId: z.string().uuid(),
  dateRequested: z.coerce.date(),
  dateDelivery: z.coerce.date(),
  deliveryAddress: z.string(),
  outgoingAddress: z.string(),
  status: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema)

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

@Controller('/order')
export class CreateOrderController {
  constructor(private createOrder: CreateOrderUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe)
    body: CreateOrderBodySchema,
  ) {
    const {
      itemId,
      name,
      userId,
      dateRequested,
      dateDelivery,
      deliveryAddress,
      outgoingAddress,
      status,
      transferId,
    } = body

    const result = await this.createOrder.execute({
      itemId,
      userId,
      name,
      dateRequested,
      dateDelivery,
      deliveryAddress,
      outgoingAddress,
      status,
      transferId,
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
