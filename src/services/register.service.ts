import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}
  async executeRegisterService({
    name,
    email,
    password,
  }: RegisterServiceParams) {
    const password_hash = await hash(password, 6)

    // if (userWithsameEmail) {
    //   throw new Error('E-mail já cadastrado')
    // }

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
