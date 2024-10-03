import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { DeleteCompanyUseCase } from '@/domain/control/application/use-cases/delete-company'

@Controller('/company/:id')
export class DeleteCompanyController {
  constructor(private deleteCompany: DeleteCompanyUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(@Param('id') companyId: string) {
    const result = await this.deleteCompany.execute({
      companyId,
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
  }
}
