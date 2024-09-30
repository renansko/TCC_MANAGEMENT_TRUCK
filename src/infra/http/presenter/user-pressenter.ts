import { User } from '@/domain/control/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      address: user.address,
      password: user.password,
      email: user.email,
      cep: user.cep,
      birth: user.birth,
      phone: user.phone,
      attachments: user.attachments,
      companyId: user.companyId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
