export class UserCPF {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(cpf: string) {
    return new UserCPF(cpf)
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
    console.log(text.length)

    const cpf = text
      .replace(/\D+/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    return new UserCPF(cpf)
  }
}
