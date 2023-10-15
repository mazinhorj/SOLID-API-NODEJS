import { expect, describe, it, beforeEach, vi } from 'vitest'
import { SearchGymsService } from './search-gyms.service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

// -22.8619307,-43.3332244 latitude / longitude MyHill
// -22.8620959,-43.3327674 68
// -22.8612019,-43.3316613 latitude / longitude ACP Gym
// -22.7896954,-43.3091486 latitude / longitude SME
// -22.5512081,-42.9843400 latitude / longitude Lelê

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    vi.setSystemTime(new Date(1983, 3, 4, 17, 30, 0))
    await gymsRepository.create({
      title: 'ACP',
      description: 'Academia Corpo Perfeito',
      phone: '',
      latitude: -22.8612019,
      longitude: -43.3316613,
    })
    vi.setSystemTime(new Date(1983, 3, 5, 17, 30, 0))
    await gymsRepository.create({
      title: 'ACP2',
      description: 'Academia Corpo Perfeito',
      phone: '',
      latitude: -22.8612019,
      longitude: -43.3316613,
    })
    vi.setSystemTime(new Date(1983, 3, 6, 17, 30, 0))
    await gymsRepository.create({
      title: 'ACP3',
      description: 'Academia Corpo Perfeito',
      phone: '',
      latitude: -22.8612019,
      longitude: -43.3316613,
    })

    const { gyms } = await sut.executeSearchGymsService({
      query: 'ACP2',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'ACP2' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 23; i++) {
      await gymsRepository.create({
        title: `Academia ${i}`,
        description: '',
        phone: '',
        latitude: -22.8612019,
        longitude: -43.3316613,
      })
    }

    const { gyms } = await sut.executeSearchGymsService({
      query: 'Academia',
      page: 2,
    })
    // console.log(checkIns)

    expect(gyms).toHaveLength(3)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia 21' }),
      expect.objectContaining({ title: 'Academia 22' }),
      expect.objectContaining({ title: 'Academia 23' }),
    ])
  })
})
