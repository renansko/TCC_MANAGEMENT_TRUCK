import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CreateCompanyUseCase } from '@/domain/control/application/use-cases/create-company'
import { CompanyCNPJ } from '@/domain/control/enterprise/entities/value-objects/company-cnpj'

const createCompanyBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cep: z.string(),
  address: z.string(),
  cnpj: z.string(),
  phone: z.string(),
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createCompanyBodySchema)

type CreateCompanyBodySchema = z.infer<typeof createCompanyBodySchema>

@Controller('/company')
export class CreateCompanyController {
  constructor(private createCompany: CreateCompanyUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe)
    body: CreateCompanyBodySchema,
  ) {
    const { name, email, cep, address, cnpj, phone, password } = body

    const result = await this.createCompany.execute({
      name,
      email,
      cep,
      address,
      cnpj: CompanyCNPJ.create(cnpj),
      phone,
      password,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}