import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '@/services/authenticate'
import { InvalidCredentalsError } from '@/services/errors/invalid-credentials-error'

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository() // aqui pode trocar para outra ORM ou qualquer método possível de conexão com db
    const authenticateService = new AuthenticateService(usersRepository)
    await authenticateService.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentalsError) {
      return rep.status(400).send({ message: err.message })
    }
    throw err
    // return rep.status(500).send() // Ajeitar depois
  }

  return rep.status(200).send
}
