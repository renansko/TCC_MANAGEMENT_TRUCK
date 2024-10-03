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
import { FetchOrdersUseCase } from '@/domain/control/application/use-cases/fetch-order-by-name'
import { OrderPresenter } from '../../presenter/order-pressenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/order/:name')
export class FetchOrdersController {
  constructor(private fetchRecentOrder: FetchOrdersUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('name') name: string,
  ) {
    const result = await this.fetchRecentOrder.execute({
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

    const orders = result.value.orders

    return { orders: orders.map(OrderPresenter.toHTTP) }
  }
}
