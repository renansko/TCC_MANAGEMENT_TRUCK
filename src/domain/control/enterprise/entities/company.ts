import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CompanyCNPJ } from './value-objects/company-cnpj'
import { Optional } from '@/core/types/optionals'

/**
 * Interface explicação de suas propiedades.
 *
 *
 * @param name (string) Nome do usuario
 * @param cnpj (string) CNPJ da compania
 * @param address (string) Endereço do compania
 * @param email (string) email do compania
 * @param phone (string) telefone do compania
 * @param password (string) senha do compania
 */

export interface companyProps {
  cnpj: CompanyCNPJ
  name: string
  address: string
  email: string
  password: string
  phone: string
  createdAt: Date
  updatedAt?: Date
}

export class Company extends Entity<companyProps> {
  get name() {
    return this.props.name
  }

  get cnpj() {
    return this.props.cnpj
  }

  get address() {
    return this.props.address
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<companyProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const company = new Company(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return company
  }
}
