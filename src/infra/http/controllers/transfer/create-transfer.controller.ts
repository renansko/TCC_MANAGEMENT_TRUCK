import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateTransferUseCase } from '@/domain/control/application/use-cases/create-transfer'

const createTransferBodySchema = z.object({
  name: z.string(),
  model: z.string(),
  attachmentIds: z.array(z.string().uuid()),
  plate: z.string(),
  companyId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(createTransferBodySchema)

type CreateTransferBodySchema = z.infer<typeof createTransferBodySchema>

@Controller('/transfer')
export class CreateTransferController {
  constructor(private createTransfer: CreateTransferUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe)
    body: CreateTransferBodySchema,
  ) {
    const { name, model, plate, attachmentIds, companyId } = body

    const result = await this.createTransfer.execute({
      name,
      plate,
      attachmentIds,
      model,
      companyId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
