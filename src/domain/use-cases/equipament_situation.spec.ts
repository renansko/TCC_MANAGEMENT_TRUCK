import { Situation } from "../entities/situation";
import { SituationUseCase } from "./equipament_situations";

const fakeSituationRepository = {
    create: async (situation: Situation) => {
        return;
    }
}

test('create a situation equipament', async () => {
    const situationUseCase = new SituationUseCase(fakeSituationRepository)

    const situation = await situationUseCase.execute({
        description:'Otimo estado, colocado recentemente',
        exchangeRequired: '100 dias'
    })

    expect(situation.description).toEqual('Otimo estado, colocado recentemente')
   
})