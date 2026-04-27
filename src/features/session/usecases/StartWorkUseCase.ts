import { ISessionRepository } from '../domain/repositories/ISessionRepository';
import { XPomodoroSession } from '../domain/entities/XPomodoroSession';

export class StartWorkUseCase {
  constructor(private readonly repository: ISessionRepository) {}

  async execute(): Promise<XPomodoroSession> {
    const session = await this.repository.getActiveSession();
    if (!session) throw new Error('Session not found');
    
    if (session.status !== 'idle') throw new Error('Cannot start work from state: ' + session.status);
    session.status = 'working';
    await this.repository.saveSession(session);
    return session;
  }
}
