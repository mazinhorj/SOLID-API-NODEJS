import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterService } from '../register.service'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository() // aqui pode trocar para outra ORM ou qualquer método possível de conexão com db
  const registerService = new RegisterService(usersRepository)
  return registerService
}
