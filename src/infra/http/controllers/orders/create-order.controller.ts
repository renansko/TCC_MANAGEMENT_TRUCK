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
import { Public } from '@/infra/auth/public'

const createOrderBodySchema = z.object({
  itemId: z.string().uuid(),
  userId: z.string().uuid(),
  transferId: z.string().uuid(),
  name: z.string(),
  orderNumber: z.string(),
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

  @Public()
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
      orderNumber,
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
      orderNumber,
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

    return { order: result.value.order }
  }
}
