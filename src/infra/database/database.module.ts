import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { TransferRepository } from '@/domain/control/application/repositories/transfer-repository'
import { PrismaTransferRepository } from './prisma/repositories/prisma-transfer-repository'
import { CompanyRepository } from '@/domain/control/application/repositories/company-repository'
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository'
import { UserRepository } from '@/domain/control/application/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'
import { ItemRepository } from '@/domain/control/application/repositories/item-repository'
import { PrismaItemRepository } from './prisma/repositories/prisma-items-repository'
import { OrderRepository } from '@/domain/control/application/repositories/order-repository'
import { PrismaOrderRepository } from './prisma/repositories/prisma-order-repository'
import { AttachmentRepository } from '@/domain/control/application/repositories/attachment-repository'
import { PrismaAttachmentRepository } from './prisma/repositories/prisma-attachments-repository'
import { TransferAttachmentRepository } from '@/domain/control/application/repositories/transfer-attachment-repository'
import { PrismaTransferAttachmentsRepository } from './prisma/repositories/prisma-transfer-attachments-repository'

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
    {
      provide: ItemRepository,
      useClass: PrismaItemRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    {
      provide: AttachmentRepository,
      useClass: PrismaAttachmentRepository,
    },

    {
      provide: TransferAttachmentRepository,
      useClass: PrismaTransferAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    TransferRepository,
    CompanyRepository,
    UserRepository,
    ItemRepository,
    OrderRepository,
    AttachmentRepository,
    TransferAttachmentRepository,
  ],
})
export class DatabaseModule {}
