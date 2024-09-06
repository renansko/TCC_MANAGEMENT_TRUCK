import { Module } from '@nestjs/common'
import { CreateTransferController } from './controllers/create-transfer.controller'
import { CreateTransferUseCase } from '@/domain/control/application/use-cases/create-transfer'
import { DatabaseModule } from '../database/database.module'
import { CreateCompanyController } from './controllers/create-company.controller'
import { CreateCompanyUseCase } from '@/domain/control/application/use-cases/create-company'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateTransferController, CreateCompanyController],
  providers: [CreateTransferUseCase, CreateCompanyUseCase],
})
export class HttpModule {}
