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
import { EditItemController } from './controllers/items/edit-items.controller'
import { EditItemUseCase } from '@/domain/control/application/use-cases/edit-item'
import { FetchItemsController } from './controllers/items/fetch-items.controller'
import { FetchItemsUseCase } from '@/domain/control/application/use-cases/fetch-items'
import { UploadedAttachmentController } from './controllers/attachment/upload-attachment.controller'
import { UploadAndCreateAttachmentUseCase } from '@/domain/control/application/use-cases/upload-and-create-attachment'
import { StorageModule } from '../storage/storage.module'
import { DeleteCompanyController } from './controllers/company/delete-company'
import { DeleteUserController } from './controllers/users/delete-users.controller'
import { DeleteItemController } from './controllers/items/delete-items.controller'
import { DeleteOrderController } from './controllers/orders/delete-order.controller'
import { DeleteTransferController } from './controllers/transfer/delete-transfer.controller'
import { DeleteCompanyUseCase } from '@/domain/control/application/use-cases/delete-company'
import { DeleteUserUseCase } from '@/domain/control/application/use-cases/delete-user'
import { DeleteItemsUseCase } from '@/domain/control/application/use-cases/delete-items-to-load'
import { DeleteOrderUseCase } from '@/domain/control/application/use-cases/delete-order'
import { DeleteTransferUseCase } from '@/domain/control/application/use-cases/delete-transfer'

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [
    CreateTransferController,
    CreateCompanyController,
    CreateUserController,
    CreateItemController,
    CreateOrderController,
    EditItemController,
    FetchItemsController,
    UploadedAttachmentController,
    DeleteCompanyController,
    DeleteUserController,
    DeleteItemController,
    DeleteOrderController,
    DeleteTransferController,
  ],
  providers: [
    CreateTransferUseCase,
    CreateCompanyUseCase,
    CreateUserUseCase,
    CreateItemsUseCase,
    CreateOrderUseCase,
    EditItemUseCase,
    FetchItemsUseCase,
    UploadAndCreateAttachmentUseCase,
    DeleteCompanyUseCase,
    DeleteUserUseCase,
    DeleteItemsUseCase,
    DeleteOrderUseCase,
    DeleteTransferUseCase,
  ],
})
export class HttpModule {}
