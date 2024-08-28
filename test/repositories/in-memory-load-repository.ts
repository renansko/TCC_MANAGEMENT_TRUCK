import { LoadRepository } from "@/domain/control/application/repositories/load-repository"
import { Load } from "@/domain/control/enterprise/entities/load"

export class InMemoryLoadRepository implements LoadRepository{
    public items: Load[] = []
    
    async create(load: Load) {
        this.items.push(load)
    }

    async findById(id: string) {
        const load = this.items.find((item) => item.id.toString() === id)

        if(!load){
            return null
        }

        return load
    }

    async delete(load: Load) {
        const loadIndex = this.items.findIndex(
            (item) => item.id === load.id)

            this.items.splice(loadIndex, 1)
    }
}