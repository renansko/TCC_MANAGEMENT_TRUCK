import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateOrderUseCase } from '@/domain/control/application/use-cases/create-order'

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
      throw new BadRequestException()
    }
  }
}
