import { UseCaseError } from '@/core/errors/use-case-error'

export class CompanyNotExistsError extends Error implements UseCaseError {
  constructor(companyId: string) {
    super(`Company with id "${companyId}" not exists.`)
  }
}
