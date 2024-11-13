import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { FetchByIdOrderUseCase } from '@/domain/control/application/use-cases/fetch-order-by-id'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderWithRelationPresenter } from '../../presenter/order-with-relation-pressenter'

@Controller('/order-by-id/:id')
export class FetchOrdersByIdController {
  constructor(private fetchByIdOrder: FetchByIdOrderUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('id') orderId: string) {
    const result = await this.fetchByIdOrder.execute({
      orderId: new UniqueEntityID(orderId),
    })

    console.log(result)

    if (result.isLeft()) {
      const error = result.value

      switch (result.value.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const orders = result.value.orders

    return { orders }
  }
}
