import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { makeRegisterService } from '@/services/factories/make-register-service'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    // const usersRepository = new PrismaUsersRepository() // aqui pode trocar para outra ORM ou qualquer método possível de conexão com db
    const registerService = makeRegisterService()
    await registerService.executeRegisterService({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return rep.status(409).send({ message: err.message })
    }
    throw err
    // return rep.status(500).send() // Ajeitar depois
  }

  return rep.status(201).send
}
