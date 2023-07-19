import { expect, describe, it } from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'

// test('checking', () => {
//   expect(2 * 2).toBe(4)
// })

describe('Register Service', () => {
  it('should hash user password on registration', async () => {
    const registerService = new RegisterService({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
          updated_at: new Date(),
        }
      },
    })

    const { user } = await registerService.executeRegisterService({
      name: 'Mazinho teste',
      email: 'teste@teste.com',
      password: '87654321',
    })

    const isPasswordCorrectlyHashed = await compare(
      '87654321',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
