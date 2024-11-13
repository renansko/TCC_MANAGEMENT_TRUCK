import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { TransferPresenter } from '../../presenter/transfer-pressenter'
import { GetTransfersUseCase } from '@/domain/control/application/use-cases/get-transfer'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/transfer')
export class GetTransfersController {
  constructor(private getTransfer: GetTransfersUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.getTransfer.execute({
      page,
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

    const transfers = result.value.transfers

    return { transfers: transfers.map(TransferPresenter.toHTTP) }
  }
}
