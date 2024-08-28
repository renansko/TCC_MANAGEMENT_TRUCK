export class LocationTruck {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(localtion: string) {
    return new LocationTruck(localtion)
  }

  /**
   * Receives a string and normalize it as a sluig.
   *
   * Example: "An example title " => "an-example-title"
   *
   * @param text (string)
   */

  static createFromText(text: string) {
    // Tratar localização
    const localization = text

    return new LocationTruck(localization)
  }
}
