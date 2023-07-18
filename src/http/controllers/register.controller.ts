import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterService } from '@/services/register.service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository() // aqui pode trocar para outra ORM ou qualquer método possível de conexão com db
    const registerService = new RegisterService(usersRepository)
    await registerService.executeRegisterService({
      name,
      email,
      password,
    })
  } catch (err) {
    return rep.status(409).send()
  }

  return rep.status(201).send
}
