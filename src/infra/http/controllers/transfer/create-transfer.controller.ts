import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CreateTransferUseCase } from '@/domain/control/application/use-cases/create-transfer'
import { CompanyNotExistsError } from '@/domain/control/application/use-cases/errors/company-not-exists-error'
import { AlreadyExistsError } from '@/domain/control/application/use-cases/errors/already-exist-error'
import { Public } from '@/infra/auth/public'

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
  
  @Public()
  @Post()
  @HttpCode(201)
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
      const error = result.value

      switch (error.constructor) {
        case AlreadyExistsError:
          throw new ConflictException(error.message)
        case CompanyNotExistsError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
    return {
      transer: result.value.transfer,
    }
  }
}
