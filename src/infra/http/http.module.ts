import { Module } from '@nestjs/common'
import { CreateTransferController } from './controllers/transfer/create-transfer.controller'
import { CreateTransferUseCase } from '@/domain/control/application/use-cases/create-transfer'
import { DatabaseModule } from '../database/database.module'
import { CreateCompanyUseCase } from '@/domain/control/application/use-cases/create-company'
import { CreateCompanyController } from './controllers/company/create-company.controller'
import { CreateUserController } from './controllers/users/create-users.controllers'
import { CreateUserUseCase } from '@/domain/control/application/use-cases/create-user'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateTransferController,
    CreateCompanyController,
    CreateUserController,
  ],
  providers: [CreateTransferUseCase, CreateCompanyUseCase, CreateUserUseCase],
})
export class HttpModule {}
