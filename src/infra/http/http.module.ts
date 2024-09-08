import { Module } from '@nestjs/common'
import { CreateTransferController } from './controllers/transfer/create-transfer.controller'
import { CreateTransferUseCase } from '@/domain/control/application/use-cases/create-transfer'
import { DatabaseModule } from '../database/database.module'
import { CreateCompanyUseCase } from '@/domain/control/application/use-cases/create-company'
import { CreateCompanyController } from './controllers/company/create-company.controller'
import { CreateUserController } from './controllers/users/create-users.controllers'
import { CreateUserUseCase } from '@/domain/control/application/use-cases/create-user'
import { CreateItemController } from './controllers/items/create-items.controller'
import { CreateItemsUseCase } from '@/domain/control/application/use-cases/create-Items'
import { CreateOrderController } from './controllers/orders/create-order.controller'
import { CreateOrderUseCase } from '@/domain/control/application/use-cases/create-order'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateTransferController,
    CreateCompanyController,
    CreateUserController,
    CreateItemController,
    CreateOrderController,
  ],
  providers: [
    CreateTransferUseCase,
    CreateCompanyUseCase,
    CreateUserUseCase,
    CreateItemsUseCase,
    CreateOrderUseCase,
  ],
})
export class HttpModule {}
