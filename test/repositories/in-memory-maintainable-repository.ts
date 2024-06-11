import { MaintainableRepository } from "@/domain/control/application/repositories/maintainable_repository"
import { Maintainable } from "@/domain/control/enterprise/entities/maintainable"

export class InMemoryMaintainableRepository implements MaintainableRepository{
    public items: Maintainable[] = []
    
    async create(maintainable: Maintainable) {
        this.items.push(maintainable)
    }

    async findById(id: string) {
        const maintainable = this.items.find((item) => item.id.toString() === id)

        if(!maintainable){
            return null
        }

        return maintainable
    }

    async delete(maintainable: Maintainable) {
        const maintainableIndex = this.items.findIndex(
            (item) => item.id === maintainable.id)

            this.items.splice(maintainableIndex, 1)
    }

}