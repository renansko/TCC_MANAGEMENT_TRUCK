import { LoadRepository } from "@/domain/control/application/repositories/load_repository"
import { Load } from "@/domain/control/enterprise/entities/load"

export class InMemoryLoadRepository implements LoadRepository{
    public items: Load[] = []
    
    async create(load: Load) {
        this.items.push(load)
    }

}