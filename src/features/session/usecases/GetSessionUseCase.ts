import { ISessionRepository } from '../domain/repositories/ISessionRepository';
import { XPomodoroSession } from '../domain/entities/XPomodoroSession';

export class GetSessionUseCase {
  constructor(private readonly repository: ISessionRepository) {}

  async execute(): Promise<{ session: XPomodoroSession, stats: { totalXP: number } }> {
    let session = await this.repository.getActiveSession();
    if (!session) {
      session = new XPomodoroSession(crypto.randomUUID(), 1, 'idle');
      await this.repository.saveSession(session);
    }
    const stats = await this.repository.getUserStats();
    return { session, stats };
  }
}
