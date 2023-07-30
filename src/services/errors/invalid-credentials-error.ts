export class InvalidCredentalsError extends Error {
  constructor() {
    super('E-mail ou senha inválidos.')
  }
}
