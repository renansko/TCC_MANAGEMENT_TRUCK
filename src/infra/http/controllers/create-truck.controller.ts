import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { TruckAvaiableUseCase } from '@/domain/control/application/use-cases/create-truck'

const createTruckBodySchema = z.object({
  name: z.string(),
  model: z.string(),
  companyId: z.string().uuid(),
  telemetryId: z.string().uuid(),
  orderId: z.string().uuid(),
  situationId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(createTruckBodySchema)

type CreateTruckBodySchema = z.infer<typeof createTruckBodySchema>

@Controller('/truck')
export class CreateTruckController {
  constructor(private createTruck: TruckAvaiableUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe)
    body: CreateTruckBodySchema,
  ) {
    const { name, model, telemetryId, orderId, companyId, situationId } = body

    const result = await this.createTruck.execute({
      name,
      model,
      telemetryId,
      orderId,
      companyId,
      situationId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
