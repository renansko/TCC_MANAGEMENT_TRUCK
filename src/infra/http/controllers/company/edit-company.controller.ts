import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { EditCompanyUseCase } from '@/domain/control/application/use-cases/edit-company'
import { CompanyCNPJ } from '@/domain/control/enterprise/entities/value-objects/company-cnpj'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'

const editCompanyBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cep: z.string(),
  cnpj: z.string(),
  address: z.string(),
  phone: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editCompanyBodySchema)

type EditCompanyBodySchema = z.infer<typeof editCompanyBodySchema>

@Controller('/company/:id')
export class EditCompanyController {
  constructor(private editCompany: EditCompanyUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: EditCompanyBodySchema,
    @Param('id') companyId: string,
  ) {
    const { name, email, cep, cnpj, address, phone } = body
    const result = await this.editCompany.execute({
      companyId,
      name,
      email,
      cep,
      cnpj: CompanyCNPJ.create(cnpj),
      address,
      phone,
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
