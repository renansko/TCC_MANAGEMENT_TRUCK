export class CompanyCNPJ {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(cpf: string) {
    return new CompanyCNPJ(cpf)
  }

  /**
   * Receives a string and normalize it as a cpf
   *
   * Example: "12312312323 " => "123.123.123-23"
   *
   * @param text (string)
   */

  static createFromText(text: string) {
    // Tratar localização

    const cpf = text
      .replace(/\D+/g, '')
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')

    return new CompanyCNPJ(cpf)
  }
}
