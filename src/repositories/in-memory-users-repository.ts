import { Prisma } from '@prisma/client'

export class InMemoryUserRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public users: any[] = []
  async create(data: Prisma.UserCreateInput) {
    this.users.push(data)
  }
}
