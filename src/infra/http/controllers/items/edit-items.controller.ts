import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { EditItemUseCase } from '@/domain/control/application/use-cases/edit-item'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

const editItemBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.number(),
  amount: z.number(),
  weight: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(editItemBodySchema)

type EditItemBodySchema = z.infer<typeof editItemBodySchema>

@Controller('/item/:id')
export class EditItemController {
  constructor(private editItem: EditItemUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: EditItemBodySchema,
    @Param('id') itemId: string,
  ) {
    const { name, description, quantity, amount, weight } = body
    const result = await this.editItem.execute({
      itemId,
      name,
      description,
      quantity,
      amount,
      weight,
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
    return { item: result.value.item }
  }
}
