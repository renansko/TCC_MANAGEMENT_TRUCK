import { Either, left, right } from '@/core/either'
import { SituationRepository } from '../repositories/situation-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-foud-error'

interface DeleteSituationRequest {
  situationId: string
}

type DeleteSituationResponse = Either<ResourceNotFoundError, null>

export class DeleteSituationUseCase {
  constructor(private situationRepository: SituationRepository) {}

  async execute({
    situationId,
  }: DeleteSituationRequest): Promise<DeleteSituationResponse> {
    const situation = await this.situationRepository.findById(situationId)

    if (!situation) {
      return left(new ResourceNotFoundError())
    }

    await this.situationRepository.delete(situation)

    return right(null)
  }
}
