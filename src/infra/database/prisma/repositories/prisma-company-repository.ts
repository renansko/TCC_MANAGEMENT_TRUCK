import { CompanyRepository } from '@/domain/control/application/repositories/company-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaCompanyMapper } from '../mappers/prisma-company-mapper'
import { Company } from '@/domain/control/enterprise/entities/company'

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(
    private prisma: PrismaService,
    // private companyAttachmentsRepository: CompanyAttachmentRepository,
    // private cache: CacheRepository,
  ) {}

  async findById(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
    })

    if (!company) {
      return null
    }

    return PrismaCompanyMapper.toDomain(company)
  }

  async create(company: Company): Promise<void> {
    const data = PrismaCompanyMapper.toPrisma(company)
    await this.prisma.company.create({
      data,
    })
  }

  async delete(company: Company): Promise<void> {
    const data = PrismaCompanyMapper.toPrisma(company)

    await this.prisma.company.delete({
      where: {
        id: data.id,
      },
    })
  }
}
