import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optionals'

/**
 * Interface explicação de suas propiedades.
 *
 *
 * @param itemId (UniqueEntityID) Id da carga a ser carregada no caminhão
 * @param userId (UniqueEntityID) Informação do usere contratante
 * @param dateRequested (DateTime) Data que foi realizada a pedido no sistema
 * @param dateDelivery (DateTime) Data que foi requisitada a entrega
 * @param deliveryAddress (String) local de entrega
 * @param status (string) status para o caminhão está 'pronto' ou não
 * @param createdAt (Date) "Data da criação do objeto virtual"
 * @param updatedAt (Date) "Mudança de informação do objeto"
 */

export interface OrderWithRelationProps {
  itemId: UniqueEntityID
  userId: UniqueEntityID
  transferId: UniqueEntityID
  name: string
  orderNumber: string
  dateRequested: Date
  dateDelivery: Date
  deliveryAddress: string
  status: string
  outgoingAddress: string
  createdAt: Date
  updatedAt?: Date | null
  item?: {
    id: string
    name: string
    description: string
    quantity: number
    amount: number
    weight: number
    createdAt: Date
    updatedAt: Date
  }
  user?: {
    id: string
    cpf: string
    name: string
    email: string
    password: string
    phone: string
    birth: Date
    cep: string
    address: string
    role: string
    companyId: string
    createdAt: Date
    updatedAt: Date
  }
  transfer?: {
    id: string
    name: string
    model: string
    plate: string
    status: string
    companyId: string
    driverId: string
    createdAt: Date
    updatedAt: Date
  }
}

export class OrderWithRelation extends Entity<OrderWithRelationProps> {
  get itemId() {
    return this.props.itemId
  }

  get orderNumber() {
    return this.props.orderNumber
  }

  get transferId() {
    return this.props.transferId
  }

  get userId() {
    return this.props.userId
  }

  get dateRequested() {
    return this.props.dateRequested
  }

  get deliveryAddress() {
    return this.props.deliveryAddress
  }

  get dateDelivery() {
    return this.props.dateDelivery
  }

  get status() {
    return this.props.status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get name() {
    return this.props.name
  }

  get outgoingAddress() {
    return this.props.outgoingAddress
  }

  set itemId(itemId: UniqueEntityID) {
    this.props.itemId = itemId
    this.touch()
  }

  set orderNumber(orderNumber: string) {
    this.props.orderNumber = orderNumber
    this.touch()
  }

  set transferId(transferId: UniqueEntityID) {
    this.props.transferId = transferId
    this.touch()
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId
    this.touch()
  }

  set dateDelivery(dateDelivery: Date) {
    this.props.dateDelivery = dateDelivery
    this.touch()
  }

  set dateRequested(dateRequested: Date) {
    this.props.dateRequested = dateRequested
    this.touch()
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set outgoingAddress(outgoingAddress: string) {
    this.props.outgoingAddress = outgoingAddress
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<OrderWithRelationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const orderWithRelation = new OrderWithRelation(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return orderWithRelation
  }
}
