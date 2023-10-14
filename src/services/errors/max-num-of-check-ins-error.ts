export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Você já fez um check-in hoje.')
  }
}
