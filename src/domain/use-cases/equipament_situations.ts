import { SituationRepository } from "../control/application/repositories/situation_repository"
import { Situation } from "../control/enterprise/entities/situation"

interface SituationRequest {
    description: string
    exchangeRequired: string
}

export class SituationUseCase {
    constructor(
        private situationRepository: SituationRepository
    ) {}

    async execute({description, exchangeRequired}: SituationRequest){
        const situationEquipaments = Situation.create({
            description,
            exchangeRequired,
        })

        this.situationRepository.create(situationEquipaments)

        return situationEquipaments
    }
}