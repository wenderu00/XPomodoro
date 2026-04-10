import { ISessionRepository } from '../domain/repositories/ISessionRepository';
import { XPomodoroSession, ProductivityFeeling } from '../domain/entities/XPomodoro';

export class SessionUseCases {
  constructor(private readonly repository: ISessionRepository) {}

  async getSession(): Promise<{ session: XPomodoroSession, stats: { totalXP: number } }> {
    let session = await this.repository.getActiveSession();
    if (!session) {
      session = new XPomodoroSession(crypto.randomUUID(), 1, 'idle');
      await this.repository.saveSession(session);
    }
    const stats = await this.repository.getUserStats();
    return { session, stats };
  }

  async startWork(): Promise<XPomodoroSession> {
    const session = await this.ensureSession();
    if (session.status !== 'idle') throw new Error('Cannot start work from state: ' + session.status);
    session.status = 'working';
    await this.repository.saveSession(session);
    return session;
  }

  async completeWork(): Promise<XPomodoroSession> {
    const session = await this.ensureSession();
    if (session.status !== 'working') throw new Error('Not currently working');
    
    session.status = 'pending_feedback';
    
    await this.repository.saveSession(session);
    return session;
  }

  async submitFeedback(feeling: ProductivityFeeling): Promise<XPomodoroSession> {
    const session = await this.ensureSession();
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

  async completeBreak(): Promise<XPomodoroSession> {
    const session = await this.ensureSession();
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
  
  async resetSession(): Promise<XPomodoroSession> {
     const newSession = new XPomodoroSession(crypto.randomUUID(), 1, 'idle');
     await this.repository.saveSession(newSession);
     return newSession;
  }

  private async ensureSession(): Promise<XPomodoroSession> {
    const session = await this.repository.getActiveSession();
    if (!session) throw new Error('Session not found');
    return session;
  }
}
