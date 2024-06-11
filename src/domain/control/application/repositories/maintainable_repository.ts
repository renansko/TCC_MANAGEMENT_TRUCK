import { Maintainable } from "../../enterprise/entities/maintainable";

export interface MaintainableRepository{
    create(maintainable: Maintainable): Promise <void>
    findById(id: string): Promise<Maintainable | null>
    delete(item: Maintainable): Promise<void>
}