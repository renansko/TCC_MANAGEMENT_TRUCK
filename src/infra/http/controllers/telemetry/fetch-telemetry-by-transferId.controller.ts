import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-foud-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchTelemetryByTransferIdUseCase } from '@/domain/control/application/use-cases/fetch-telemetry-by-transferId'
import { TelemetryPresenter } from '../../presenter/telemetry-pressenter'
import { Public } from '@/infra/auth/public'

@Controller('/telemetry-by-transfer-id/:id')
export class FetchTelemetryByTransferIdController {
  constructor(
    private fetchByTransferdTelemetry: FetchTelemetryByTransferIdUseCase,
  ) {}

  @Public()
  @Get()
  @HttpCode(200)
  async handle(@Param('id') transferId: string) {
    const result = await this.fetchByTransferdTelemetry.execute({
      transferId: new UniqueEntityID(transferId),
    })

    if (result.isLeft()) {
      const error = result.value

      switch (result.value.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const telemetry = result.value.telemetrys

    return { telemetrys: telemetry.map(TelemetryPresenter.toHTTP) }
  }
}
