import { UseCaseError } from '@/core/errors/use-case-error'

export class PlateAlreadyExistsError extends Error implements UseCaseError {
  constructor(plate: string) {
    super(`Transfer with plate "${plate}" already exists.`)
  }
}
