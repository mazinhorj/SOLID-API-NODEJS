import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in.service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-num-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error.ts'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

// -22.8619307,-43.3332244 latitude / longitude MyHill
// -22.8620959,-43.3327674 68
// -22.8612019,-43.3316613 latitude / longitude ACP Gym
// -22.7896954,-43.3091486 latitude / longitude SME
// -22.5512081,-42.9843400 latitude / longitude Lelê

describe('CheckIn Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    const gym = await gymsRepository.create({
      id: 'gym01',
      title: 'Brainly Gym',
      description: '',
      phone: '',
      latitude: -22.8619307,
      longitude: -43.3332244,
    })
    // console.log(`Id da academia: ${gym.id}`)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    vi.setSystemTime(new Date(1983, 3, 4, 17, 30, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
      userLatitude: -22.8619307,
      userLongitude: -43.3332244,
    })
    // console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(1983, 3, 4, 17, 30, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
      userLatitude: -22.8619307,
      userLongitude: -43.3332244,
    })
    // console.log(checkIn.created_at)

    expect(() =>
      sut.execute({
        gymId: 'gym01',
        userId: 'user01',
        userLatitude: -22.8619307,
        userLongitude: -43.3332244,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check-in twice but in different day', async () => {
    vi.setSystemTime(new Date(1983, 3, 5, 17, 30, 0))
    await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
      userLatitude: -22.8619307,
      userLongitude: -43.3332244,
    })

    vi.setSystemTime(new Date(1983, 3, 6, 17, 30, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym01',
      userId: 'user01',
      userLatitude: -22.8619307,
      userLongitude: -43.3332244,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in in a distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym02',
      title: 'Muscle Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.5512081),
      longitude: new Decimal(-42.98434),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym02',
        userId: 'user01',
        userLatitude: -22.8620849,
        userLongitude: -43.3328484,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
