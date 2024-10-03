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
import { FetchItemsUseCase } from '@/domain/control/application/use-cases/fetch-items-by-name'
import { ItemPresenter } from '../../presenter/item-pressenter'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/item/:name')
export class FetchItemsController {
  constructor(private fetchRecentItem: FetchItemsUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('name') name: string,
  ) {
    const result = await this.fetchRecentItem.execute({
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

    const items = result.value.items

    return { items: items.map(ItemPresenter.toHTTP) }
  }
}
