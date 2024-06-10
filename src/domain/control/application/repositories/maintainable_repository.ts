import { Maintainable } from "../../enterprise/entities/maintainable";

export interface MaintainableRepository{
    create(maintainable: Maintainable): Promise <void>
}