import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { FetchTransfersUseCase } from '@/domain/control/application/use-cases/fetch-transfer-by-name'
import { TransferPresenter } from '../../presenter/transfer-pressenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/transfer/:name')
export class FetchTransfersController {
  constructor(private fetchRecentTransfer: FetchTransfersUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('name') name: string,
  ) {
    const result = await this.fetchRecentTransfer.execute({
      name,
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
