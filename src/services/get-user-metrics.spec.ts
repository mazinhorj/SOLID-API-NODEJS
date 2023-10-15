import { expect, describe, it, beforeEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from './get-user-metrics.service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

// -22.8619307,-43.3332244 latitude / longitude MyHill
// -22.8620959,-43.3327674 68
// -22.8612019,-43.3316613 latitude / longitude ACP Gym
// -22.7896954,-43.3091486 latitude / longitude SME
// -22.5512081,-42.9843400 latitude / longitude Lelê

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
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
    const { checkInsCount } = await sut.execute({
      userId: 'user01',
    })
    // console.log(checkIns)

    expect(checkInsCount).toEqual(3)
  })
})
