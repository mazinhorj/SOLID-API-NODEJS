import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceParams {
  name: string
  email: string
  password: string
}

export async function registerService({
  name,
  email,
  password,
}: RegisterServiceParams) {
  const password_hash = await hash(password, 6)

  const userWithsameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithsameEmail) {
    throw new Error('E-mail já cadastrado')
  }

  const prismaUsersRepository = new PrismaUserRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })
}
