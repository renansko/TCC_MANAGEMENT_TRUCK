import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optionals'
import { TransferAttachmentList } from './transfer-attachment-list'

/**
 * Interface explicação de suas propiedades.
 *
 *
 * @param name (string) Nome do caminhão
 * @param model (string) Modelo do caminhão
 * @param plate (string) Placa do carro
 * @param driverId (UniqueEntityID) Id do pedido a ser entregue pelo caminhão
 * @param companyId (uniqueentityID) Empresa do caminhão
 * @param situationId (UniqueEntityID) Id situação
 * @param createdAt (Date) "Data da criação do objeto virtual"
 * @param updatedAt (Date) "Mudança de informação do objeto"
 */
export interface TransferProps {
  name: string
  model: string
  plate: string
  attachments: TransferAttachmentList
  companyId: UniqueEntityID
  driverId?: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Transfer extends AggregateRoot<TransferProps> {
  get name() {
    return this.props.name
  }

  get model() {
    return this.props.model
  }

  get plate() {
    return this.props.plate
  }

  get companyId() {
    return this.props.companyId
  }

  get attachments() {
    return this.props.attachments
  }

  get driverId() {
    return this.props.driverId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set driverId(driverId: UniqueEntityID | undefined | null) {
    if (driverId === undefined || driverId === null) {
      return
    }
    this.props.driverId = driverId

    this.touch()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set plate(plate: string) {
    this.props.plate = plate
    this.touch()
  }

  set attachments(attachments: TransferAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  set model(model: string) {
    this.props.model = model
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<TransferProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const transfer = new Transfer(
      {
        ...props,
        attachments: props.attachments ?? new TransferAttachmentList(),
        createdAt: new Date(),
      },
      id,
    )

    return transfer
  }
}
