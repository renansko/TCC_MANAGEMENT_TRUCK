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
import { FetchItemsUseCase } from '@/domain/control/application/use-cases/fetch-items-by-name'
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
import { EditTransferController } from './controllers/transfer/edit.transfer.controller'
import { EditTransferUseCase } from '@/domain/control/application/use-cases/edit-transfer'
import { EditCompanyController } from './controllers/company/edit-company.controller'
import { EditCompanyUseCase } from '@/domain/control/application/use-cases/edit-company'
import { FetchCompanysUseCase } from '@/domain/control/application/use-cases/fetch-company-by-name'
import { FetchCompanysController } from './controllers/company/fetch-company.controller'
import { FetchOrdersController } from './controllers/orders/fetch-order.controller'
import { FetchOrdersUseCase } from '@/domain/control/application/use-cases/fetch-order-by-name'
import { EditOrderUseCase } from '@/domain/control/application/use-cases/edit-order'
import { EditOrderController } from './controllers/orders/edit-order.controller'
import { EditUserController } from './controllers/users/edit-users.controller'
import { EditUserUseCase } from '@/domain/control/application/use-cases/edit-user'
import { FetchUsersUseCase } from '@/domain/control/application/use-cases/fetch-user-by-name'
import { FetchUsersController } from './controllers/users/fetch-users.controller'
import { FetchTransfersController } from './controllers/transfer/fetch-transfer-by-name.controller'
import { FetchTransfersUseCase } from '@/domain/control/application/use-cases/fetch-transfer-by-name'
import { GetTransfersController } from './controllers/transfer/get-all-transfer.controller'
import { GetTransfersUseCase } from '@/domain/control/application/use-cases/get-transfer'
import { FetchByIdOrderUseCase } from '@/domain/control/application/use-cases/fetch-order-by-id'
import { FetchOrdersByIdController } from './controllers/orders/fetch-order-by-id.controller'
import { GetOrdersController } from './controllers/orders/get-all-order.controller'
import { GetOrdersUseCase } from '@/domain/control/application/use-cases/get-order'

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [
    UploadedAttachmentController,
    CreateTransferController,
    CreateCompanyController,
    CreateUserController,
    CreateItemController,
    CreateOrderController,
    DeleteCompanyController,
    DeleteUserController,
    DeleteItemController,
    DeleteOrderController,
    DeleteTransferController,
    EditItemController,
    EditTransferController,
    EditCompanyController,
    EditOrderController,
    EditUserController,
    FetchItemsController,
    FetchCompanysController,
    FetchOrdersController,
    FetchUsersController,
    FetchTransfersController,
    GetTransfersController,
    FetchOrdersByIdController,
    GetOrdersController,
  ],
  providers: [
    UploadAndCreateAttachmentUseCase,
    CreateTransferUseCase,
    CreateCompanyUseCase,
    CreateUserUseCase,
    CreateItemsUseCase,
    CreateOrderUseCase,
    DeleteUserUseCase,
    DeleteItemsUseCase,
    DeleteOrderUseCase,
    DeleteTransferUseCase,
    DeleteCompanyUseCase,
    EditItemUseCase,
    EditTransferUseCase,
    EditCompanyUseCase,
    EditOrderUseCase,
    EditUserUseCase,
    FetchItemsUseCase,
    FetchCompanysUseCase,
    FetchOrdersUseCase,
    FetchUsersUseCase,
    FetchTransfersUseCase,
    GetTransfersUseCase,
    FetchByIdOrderUseCase,
    GetOrdersUseCase,
  ],
})
export class HttpModule {}
