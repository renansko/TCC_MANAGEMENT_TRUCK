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
import { CreateTelemetryUseCase } from '@/domain/control/application/use-cases/create-telemetry'
import { NotFoundError } from '@/domain/control/application/use-cases/errors/not-found-error'

const createTelemetryBodySchema = z.object({
  transferId: z.string().uuid(),
  speed: z.number(),
  braking: z.number(),
  bends: z.number(),
  fuel: z.number(),
  ignition: z.boolean(),
})

const bodyValidationPipe = new ZodValidationPipe(createTelemetryBodySchema)

type CreateTelemetryBodySchema = z.infer<typeof createTelemetryBodySchema>

@Controller('/telemetry')
export class CreateTelemetryController {
  constructor(private createTelemetry: CreateTelemetryUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe)
    body: CreateTelemetryBodySchema,
  ) {
    const { transferId, speed, braking, bends, fuel, ignition } = body

    const result = await this.createTelemetry.execute({
      transferId,
      speed,
      braking,
      bends,
      fuel,
      ignition,
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

    return { telemetry: result.value.telemetry }
  }
}
