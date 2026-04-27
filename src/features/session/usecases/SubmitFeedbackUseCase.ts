import { ISessionRepository } from '../domain/repositories/ISessionRepository';
import { XPomodoroSession } from '../domain/entities/XPomodoroSession';
import { ProductivityFeeling } from '../domain/types/ProductivityFeeling';

export class SubmitFeedbackUseCase {
  constructor(private readonly repository: ISessionRepository) {}

  async execute(feeling: ProductivityFeeling): Promise<XPomodoroSession> {
    const session = await this.repository.getActiveSession();
    if (!session) throw new Error('Session not found');

    if (session.status !== 'pending_feedback') throw new Error('Not pending feedback');
    
    session.feedbacks.push({ cycleNumber: session.currentCycle, feeling });
    
    if (session.currentCycle < 4) {
      session.status = 'short_break';
    } else {
      session.status = 'long_break';
    }
    
    await this.repository.saveSession(session);
    return session;
  }
}
