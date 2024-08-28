import { User } from "../../enterprise/entities/user"

export interface UserRepository{
    create(user: User): Promise <void>
    findById(id: string): Promise<User | null>
    delete(user: User): Promise<void>
}