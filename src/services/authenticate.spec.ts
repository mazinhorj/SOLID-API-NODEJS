import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate'
import { InvalidCredentalsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Mazinho teste',
      email: 'teste0@teste.com',
      password_hash: await hash('87654321', 6),
    })

    const { user } = await sut.execute({
      email: 'teste0@teste.com',
      password: '87654321',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'teste_errado@teste.com',
        password: '87654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentalsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Mazinho teste',
      email: 'teste0@teste.com',
      password_hash: await hash('87654321', 6),
    })

    expect(() =>
      sut.execute({
        email: 'teste_errado@teste.com',
        password: '87654321o',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentalsError)
  })
})
