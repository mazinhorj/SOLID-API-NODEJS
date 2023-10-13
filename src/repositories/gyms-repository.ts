import { Gym } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  // findByEmail(email: string): Promise<User | null>;
  // create(data: Prisma.GymCreateInput): Promise<Gym>;
}
