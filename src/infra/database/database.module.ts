import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { TransferRepository } from '@/domain/control/application/repositories/transfer-repository'
import { PrismaTransferRepository } from './prisma/repositories/prisma-transfer-repository'
import { CompanyRepository } from '@/domain/control/application/repositories/company-repository'
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository'
import { UserRepository } from '@/domain/control/application/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'

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
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    PrismaService,
    TransferRepository,
    CompanyRepository,
    UserRepository,
  ],
})
export class DatabaseModule {}
