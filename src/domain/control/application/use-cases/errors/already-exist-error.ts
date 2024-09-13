import { UseCaseError } from '@/core/errors/use-case-error'

export class AlreadyExistsError extends Error implements UseCaseError {
  constructor(text: string) {
    super(`Entidade com "${text}" já existe.`)
  }
}
