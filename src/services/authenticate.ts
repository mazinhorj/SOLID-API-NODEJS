import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentalsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateServiceReq {
  email: string
  password: string
}

interface AuthenticateServiceRep {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceReq): Promise<AuthenticateServiceRep> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentalsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentalsError()
    }

    return {
      user,
    }
  }
}
