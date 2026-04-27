import { ISessionRepository } from '../domain/repositories/ISessionRepository';
import { XPomodoroSession } from '../domain/entities/XPomodoroSession';

export class CompleteWorkUseCase {
  constructor(private readonly repository: ISessionRepository) {}

  async execute(): Promise<XPomodoroSession> {
    const session = await this.repository.getActiveSession();
    if (!session) throw new Error('Session not found');
    
    if (session.status !== 'working') throw new Error('Not currently working');
    
    session.status = 'pending_feedback';
    
    await this.repository.saveSession(session);
    return session;
  }
}
