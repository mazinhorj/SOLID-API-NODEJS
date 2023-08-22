import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.executeRegisterService({
      name: 'Mazinho teste',
      email: 'teste0@teste.com',
      password: '87654321',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password on registration', async () => {
    const { user } = await sut.executeRegisterService({
      name: 'Mazinho teste',
      email: 'teste1@teste.com',
      password: '87654321',
    })

    const isPasswordCorrectlyHashed = await compare(
      '87654321',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'teste2@teste.com'

    await sut.executeRegisterService({
      name: 'Mazinho teste',
      email,
      password: '87654321',
    })

    await expect(() =>
      sut.executeRegisterService({
        name: 'Mazinho teste',
        email,
        password: '87654321',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
