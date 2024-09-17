import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchItemsUseCase } from '@/domain/control/application/use-cases/fetch-items'
import { ItemPresenter } from '../../presenter/item-pressenter'

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
  constructor(private fetchRecentQuestion: FetchItemsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('name') name: string,
  ) {
    const result = await this.fetchRecentQuestion.execute({
      name,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const items = result.value.items

    return { items: items.map(ItemPresenter.toHTTP) }
  }
}
