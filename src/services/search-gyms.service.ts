// import { prisma } from '@/lib/prisma'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchGymsServiceReq {
  query: string
  page: number
  // title: string;
  // description: string | null;
  // phone: string | null;
  // latitude: number;
  // longitude: number;
}

interface SearchGymsServiceRep {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}
  async executeSearchGymsService({
    query,
    page,
  }: SearchGymsServiceReq): Promise<SearchGymsServiceRep> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    if (!gyms) {
      throw new ResourceNotFoundError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    return {
      gyms,
    }
  }
}
