import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchUsersUseCase } from '@/domain/control/application/use-cases/fetch-user'
import { UserPresenter } from '../../presenter/user-pressenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/user/:name')
export class FetchUsersController {
  constructor(private fetchRecentQuestion: FetchUsersUseCase) {}

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

    const users = result.value.users

    return { users: users.map(UserPresenter.toHTTP) }
  }
}
