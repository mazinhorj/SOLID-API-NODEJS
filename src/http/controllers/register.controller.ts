import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerService } from '@/services/register.service'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    await registerService({
      name,
      email,
      password,
    })
  } catch (err) {
    return rep.status(409).send()
  }

  return rep.status(201).send
}
