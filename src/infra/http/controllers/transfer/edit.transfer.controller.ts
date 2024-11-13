import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  MethodNotAllowedException,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { EditTransferUseCase } from '@/domain/control/application/use-cases/edit-transfer'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

const editTransferBodySchema = z.object({
  name: z.string(),
  model: z.string(),
  plate: z.string(),
  attachments: z.array(z.string()),
  driverId: z.string().optional(),
  companyId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(editTransferBodySchema)

type EditTransferBodySchema = z.infer<typeof editTransferBodySchema>

@Controller('/transfer/:id')
export class EditTransferController {
  constructor(private editTransfer: EditTransferUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: EditTransferBodySchema,
    @Param('id') transferId: string,
  ) {
    const { name, model, plate, attachments, driverId, companyId } = body
    const result = await this.editTransfer.execute({
      transferId,
      name,
      model,
      plate,
      attachments,
      driverId,
      companyId,
    })
    if (result.isLeft()) {
      const error = result.value
      switch (result.value.constructor) {
        case NotAllowedError:
          throw new MethodNotAllowedException(error.message)
        case ResourceNotFoundError:
          throw new ForbiddenException(error.message)
        default:
          throw new BadRequestException()
      }
    }

    return {
      transfer: result.value.transfer,
    }
  }
}
