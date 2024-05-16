import { Maintainable } from "../entities/maintainable";

export interface MaintainableRepository{
    create(maintainable: Maintainable): Promise <void>
}