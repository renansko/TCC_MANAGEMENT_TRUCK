import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optionals'

/**
 * Interface explicação de suas propiedades.
 *
 *
 * @param name (string) nome do item
 * @param description (string) descrição do item.
 * @param quantity (number) quantidade do item: identificar se o item é unitario ou não
 * @param amount (number) preço do item.
 */

export interface ItemProps {
  name: string
  description: string
  quantity: number
  amount: number
  createdAt: Date
  updatedAt?: Date
}

export class Item extends Entity<ItemProps> {
  get description() {
    return this.props.description
  }

  get name() {
    return this.props.name
  }

  get quantity() {
    return this.props.quantity
  }

  get amount() {
    return this.props.amount
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
    this.touch()
  }

  set amount(amount: number) {
    this.props.amount = amount
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<ItemProps, 'createdAt'>, id?: UniqueEntityID) {
    const item = new Item(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return item
  }
}
