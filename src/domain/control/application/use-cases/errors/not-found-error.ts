import { UseCaseError } from '@/core/errors/use-case-error'

export class NotFoundError extends Error implements UseCaseError {
  constructor(id: string) {
    super(`id: "${id}" not found!.`)
  }
}
