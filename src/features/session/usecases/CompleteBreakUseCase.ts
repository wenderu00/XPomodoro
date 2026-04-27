import { ISessionRepository } from '../domain/repositories/ISessionRepository';
import { XPomodoroSession } from '../domain/entities/XPomodoroSession';

export class CompleteBreakUseCase {
  constructor(private readonly repository: ISessionRepository) {}

  async execute(): Promise<XPomodoroSession> {
    const session = await this.repository.getActiveSession();
    if (!session) throw new Error('Session not found');

    if (session.status === 'short_break') {
      session.status = 'idle';
      session.currentCycle += 1;
    } else if (session.status === 'long_break') {
      session.status = 'pending_summary';
    } else {
      throw new Error('Not currently in a break');
    }
    
    await this.repository.saveSession(session);
    return session;
  }
}
