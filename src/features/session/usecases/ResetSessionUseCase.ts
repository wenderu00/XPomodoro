import { ISessionRepository } from '../domain/repositories/ISessionRepository';
import { XPomodoroSession } from '../domain/entities/XPomodoroSession';

export class ResetSessionUseCase {
  constructor(private readonly repository: ISessionRepository) {}

  async execute(): Promise<XPomodoroSession> {
    const newSession = new XPomodoroSession(crypto.randomUUID(), 1, 'idle');
    await this.repository.saveSession(newSession);
    return newSession;
  }
}
