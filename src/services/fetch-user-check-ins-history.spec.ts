import { expect, describe, it, beforeEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history.service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryService

// -22.8619307,-43.3332244 latitude / longitude MyHill
// -22.8620959,-43.3327674 68
// -22.8612019,-43.3316613 latitude / longitude ACP Gym
// -22.7896954,-43.3091486 latitude / longitude SME
// -22.5512081,-42.9843400 latitude / longitude Lelê

describe('Fetch CheckIn History Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryService(checkInsRepository)
  })

  it('should be able to fetch check-ins history', async () => {
    vi.setSystemTime(new Date(1983, 3, 4, 17, 30, 0))
    await checkInsRepository.create({
      gym_id: 'gym01',
      user_id: 'user01',
    })
    vi.setSystemTime(new Date(1983, 3, 5, 17, 30, 0))
    await checkInsRepository.create({
      gym_id: 'gym02',
      user_id: 'user01',
    })
    vi.setSystemTime(new Date(1983, 3, 6, 17, 30, 0))
    await checkInsRepository.create({
      gym_id: 'gym03',
      user_id: 'user01',
    })
    const { checkIns } = await sut.execute({
      userId: 'user01',
      page: 1,
    })
    // console.log(checkIns)

    expect(checkIns).toHaveLength(3)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym01' }),
      expect.objectContaining({ gym_id: 'gym02' }),
      expect.objectContaining({ gym_id: 'gym03' }),
    ])
  })

  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 23; i++) {
      await checkInsRepository.create({
        gym_id: `gym${i}`,
        user_id: `user01`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user01',
      page: 2,
    })
    // console.log(checkIns)

    expect(checkIns).toHaveLength(3)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym21' }),
      expect.objectContaining({ gym_id: 'gym22' }),
      expect.objectContaining({ gym_id: 'gym23' }),
    ])
  })
})
