import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { TransferRepository } from '@/domain/control/application/repositories/transfer-repository'
import { PrismaTransferRepository } from './prisma/repositories/prisma-transfer-repository'
import { CompanyRepository } from '@/domain/control/application/repositories/company-repository'
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: TransferRepository,
      useClass: PrismaTransferRepository,
    },
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
  ],
  exports: [PrismaService, TransferRepository, CompanyRepository],
})
export class DatabaseModule {}
