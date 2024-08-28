import { SituationRepository } from '../repositories/situation-repository'
import { Situation } from '../../enterprise/entities/situation'
import { Either, right } from '@/core/either'

interface SituationRequest {
  description: string
  exchangeRequired: string
}

type SituationResponse = Either<
  null,
  {
    situation: Situation
  }
>

export class SituationUseCase {
  constructor(private situationRepository: SituationRepository) {}

  async execute({
    description,
    exchangeRequired,
  }: SituationRequest): Promise<SituationResponse> {
    const situation = Situation.create({
      description,
      exchangeRequired,
    })

    this.situationRepository.create(situation)

    return right({
      situation,
    })
  }
}
