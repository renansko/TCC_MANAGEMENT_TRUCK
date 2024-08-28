import { UserRepository } from "@/domain/control/application/repositories/user-repository"
import { User } from "@/domain/control/enterprise/entities/user"

export class InMemoryUserRepository implements UserRepository{
    public items: User[] = []
    
    async create(user: User) {
        this.items.push(user)
    }

    async findById(id: string) {
        const user = this.items.find((item) => item.id.toString() === id)

        if(!user){
            return null
        }

        return user
    }

    async delete(user: User) {
        const userIndex = this.items.findIndex(
            (item) => item.id === user.id)

            this.items.splice(userIndex, 1)
    }

}