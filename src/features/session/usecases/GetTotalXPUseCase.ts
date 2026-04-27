import { ISessionRepository } from '../domain/repositories/ISessionRepository';

export class GetTotalXPUseCase {
  constructor(private readonly repository: ISessionRepository) {}

  async execute(): Promise<number> {
    const stats = await this.repository.getUserStats();
    return stats.totalXP;
  }
}
