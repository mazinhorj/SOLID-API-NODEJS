import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
// import { UserAlreadyExistsError } from './errors/user-already-exists-error'
// import { RegisterService } from './register.service'
import { AuthenticateService } from './authenticate'
import { InvalidCredentalsError } from './errors/invalid-credentials-error'

describe('Authenticate Service', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    expect(() =>
      sut.execute({
        email: 'teste_errado@teste.com',
        password: '87654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentalsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

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
