export class UserCPFAlreadyExistsError extends Error {
  constructor(cpf: string) {
    super(`CPF ${cpf} already exists.`)
  }
}
