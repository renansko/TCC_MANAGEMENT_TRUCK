import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchCompanysUseCase } from '@/domain/control/application/use-cases/fetch-company-by-name'
import { CompanyPresenter } from '../../presenter/company-pressenter'
import { Public } from '@/infra/auth/public'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/company/:name')
export class FetchCompanysController {
  constructor(private fetchRecentQuestion: FetchCompanysUseCase) {}

  @Public()
  @Get()
  @HttpCode(200)
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

    const companys = result.value.companys

    return { companys: companys.map(CompanyPresenter.toHTTP) }
  }
}
