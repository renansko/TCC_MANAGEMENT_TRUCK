import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optionals'

/**
 * Interface explicação de suas propiedades.
 *
 *
 * @param engineTemperature (string) Temperatura motor
 * @param speed (number) velocidade em tempo real @param averageSpeed (number) Velocidade média @param speedExceed (string) velocidade exedita
 * @param braking (number) frenagem brusca pesquisar
 * @param bends (number) curvas perigosa pesquisar
 * @param fuel (number) consumo de combustivel
 * @param ignition (bool) Status da ignição.
 * @param createdAt (Date) "Data da criação do objeto virtual"
 * @param updatedAt (Date) "Mudança de informação do objeto"
 */
export interface telemetryProps {
  transferId: UniqueEntityID
  speed: number
  braking: number
  bends: number
  fuel: number
  ignition: boolean
  createdAt: Date
  updatedAt?: Date | null
}

export class Telemetry extends Entity<telemetryProps> {
  get transferId() {
    return this.props.transferId
  }

  get speed() {
    return this.props.speed
  }

  get braking() {
    return this.props.braking
  }

  get bends() {
    return this.props.bends
  }

  get fuel() {
    return this.props.fuel
  }

  get ignition() {
    return this.props.ignition
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set fuel(fuel: number) {
    this.props.fuel = fuel
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<telemetryProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const telemetry = new Telemetry(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return telemetry
  }
}
