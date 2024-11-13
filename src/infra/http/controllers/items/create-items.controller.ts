import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateItemsUseCase } from '@/domain/control/application/use-cases/create-Items'

const createItemBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.number(),
  amount: z.number(),
  weight: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(createItemBodySchema)

type CreateItemBodySchema = z.infer<typeof createItemBodySchema>

@Controller('/item')
export class CreateItemController {
  constructor(private createItem: CreateItemsUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe)
    body: CreateItemBodySchema,
  ) {
    const { name, description, quantity, amount, weight } = body

    const result = await this.createItem.execute({
      name,
      description,
      quantity,
      amount,
      weight,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
    return { item: result.value.item }
  }
}
