import { MaintainableRepository } from "@/domain/control/application/repositories/maintainable_repository"
import { Maintainable } from "@/domain/control/enterprise/entities/maintainable"

export class InMemoryMaintainableRepository implements MaintainableRepository{
    public items: Maintainable[] = []
    
    async create(maintainable: Maintainable) {
        this.items.push(maintainable)
    }

}