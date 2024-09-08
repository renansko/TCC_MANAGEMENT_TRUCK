import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optionals'
import { UserCPF } from './value-objects/user-cpf'
import { TransferAttachmentList } from './transfer-attachment-list'

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
  name: string
  cpf: UserCPF
  address: string
  password: string
  email: string
  cep: string
  birth: string
  phone: string
  attachments: TransferAttachmentList
  companyId?: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
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

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  get attachments() {
    return this.props.attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set password(password: string) {
    this.props.password = password
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

  set address(address: string) {
    this.props.address = address
    this.touch()
  }

  set birth(birth: string) {
    this.props.birth = birth
    this.touch()
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  set cpf(cpf: UserCPF) {
    this.props.cpf = cpf
    this.touch()
  }

  set companyId(companyId: UniqueEntityID | undefined | null) {
    if (companyId === null) {
      return
    }

    this.props.companyId = companyId
    this.touch()
  }

  set attachments(attachments: TransferAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<userProps, 'createdAt' | 'companyId' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        attachments: props.attachments ?? new TransferAttachmentList(),
        createdAt: new Date(),
      },
      id,
    )

    return user
  }
}
