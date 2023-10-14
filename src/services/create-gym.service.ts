// import { prisma } from '@/lib/prisma'
import { GymAlreadyExistsError } from './errors/gym-already-exists-error'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymServiceParams {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}
  async executeCreateGymService({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymServiceParams): Promise<CreateGymServiceResponse> {
    const gymWithSameTitle = await this.gymsRepository.findByTitle(title)

    if (gymWithSameTitle) {
      throw new GymAlreadyExistsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return {
      gym,
    }
  }
}
