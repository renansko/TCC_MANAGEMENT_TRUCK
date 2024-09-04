import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optionals'

/**
 * Interface explicação de suas propiedades.
 *
 *
 * @param name (string) Nome do caminhão
 * @param model (string) Modelo do caminhão
 * @param placa (string) Placa do carro
 * @param companyId (uniqueentityID) Empresa do caminhão
 * @param telemetryId (UniqueEntityID) dados em 'tempo real' do caminhão
 * @param orderId (UniqueEntityID) Id do pedido a ser entregue pelo caminhão
 * @param situationId (UniqueEntityID) Id situação
 * @param createdAt (Date) "Data da criação do objeto virtual"
 * @param updatedAt (Date) "Mudança de informação do objeto"
 */
export interface TransferProps {
  name: string
  model: string
  placa: string
  companyId: UniqueEntityID
  telemetryId: UniqueEntityID
  orderId: UniqueEntityID
  situationId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Transfer extends Entity<TransferProps> {
  get name() {
    return this.props.name
  }

  get companyId() {
    return this.props.companyId
  }

  get placa() {
    return this.props.placa
  }

  get model() {
    return this.props.model
  }

  get telemetryId() {
    return this.props.telemetryId
  }

  get orderId() {
    return this.props.orderId
  }

  get situationId() {
    return this.props.situationId
  }

  get createdAt() {
    return this.props.createdAt
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set placa(placa: string) {
    this.props.placa = placa
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
    props: Optional<TransferProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const transfer = new Transfer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return transfer
  }
}
