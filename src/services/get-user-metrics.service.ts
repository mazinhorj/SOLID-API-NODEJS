import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsServiceReq {
  userId: string
}

interface GetUserMetricsServiceRep {
  checkInsCount: number
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsServiceReq): Promise<GetUserMetricsServiceRep> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
