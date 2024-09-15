import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { EditItemUseCase } from '@/domain/control/application/use-cases/edit-item'

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
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe)
    @Param('id')
    itemId: string,
    body: EditItemBodySchema,
  ) {
    console.log(body)
    const { name, description, quantity, amount, weight } = body
    console.log(name)
    const result = await this.editItem.execute({
      itemId,
      name,
      description,
      quantity,
      amount,
      weight,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
