import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optionals'
import { UserCPF } from './value-objects/user-cpf'

/**
 * Interface explicação de suas propiedades.
 *
 *
 * @param name (string) Nome do usuario
 * @param cpf (string) CPF do usuario
 * @param address (string) Endereço do usere
 * @param email (string) email do usere
 * @param phone (string) telefone do usere
 * @param cep (String) CEP do usuario
 * @param Birth (string) Data de nascimento
 * @param companyId (UniqueEntityID) compania que pertence
 */

export interface userProps {
  cpf: UserCPF
  name: string
  address: string
  password: string
  email: string
  cep: string
  birth: string
  phone: string
  companyId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class User extends Entity<userProps> {
  get name() {
    return this.props.name
  }

  get companyId() {
    return this.props.companyId
  }

  get cpf() {
    return this.props.cpf
  }

  get cep() {
    return this.props.cep
  }

  get birth() {
    return this.props.birth
  }

  get address() {
    return this.props.address
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<userProps, 'createdAt' | 'companyId'>,
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return user
  }
}
