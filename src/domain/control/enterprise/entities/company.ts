import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CompanyCNPJ } from './value-objects/company-cnpj'
import { Optional } from '@/core/types/optionals'

/**
 * Interface explicação de suas propiedades.
 *
 *
 * @param name (string) Nome do usuario
 * @param email (string) email do compania
 * @param cnpj (string) CNPJ da compania
 * @param cep (CEP) CEP da compania
 * @param address (string) Endereço do compania
 * @param phone (string) telefone do compania
 * @param password (string) senha do compania
 */

export interface companyProps {
  name: string
  email: string
  cnpj: CompanyCNPJ
  cep: string
  address: string
  password: string
  phone: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Company extends Entity<companyProps> {
  get name() {
    return this.props.name
  }

  get cep() {
    return this.props.cep
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

  get createdAt() {
    return this.props.createdAt
  }

  get phone() {
    return this.props.phone
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set cep(cep: string) {
    this.props.cep = cep
    this.touch()
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  set cnpj(cnpj: CompanyCNPJ) {
    this.props.cnpj = cnpj
    this.touch()
  }

  set address(address: string) {
    this.props.address = address
    this.touch()
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
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
