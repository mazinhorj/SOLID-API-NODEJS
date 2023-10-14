import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym.service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('CreateGym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.executeCreateGymService({
      title: 'ACP',
      description: 'Academia Corpo Perfeito',
      phone: '21 2222-2222',
      latitude: -22.8612019,
      longitude: -43.3316613,
    })

    // console.log(`Academia criada com id ${gym.id}`)
    expect(gym.id).toEqual(expect.any(String))
  })
})
