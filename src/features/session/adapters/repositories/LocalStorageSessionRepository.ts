import { ISessionRepository } from '../../domain/repositories/ISessionRepository';
import { XPomodoroSession } from '../../domain/entities/XPomodoroSession';
import { UserStats } from '../../domain/value-objects/UserStats';

const SESSION_KEY = '@xpomodoro:active_session';
const STATS_KEY = '@xpomodoro:user_stats';

export class LocalStorageSessionRepository implements ISessionRepository {
  
  async getActiveSession(): Promise<XPomodoroSession | null> {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    
    try {
      const parsed = JSON.parse(data);
      return new XPomodoroSession(
        parsed.id,
        parsed.currentCycle < 1 ? 1 : parsed.currentCycle,
        parsed.status,
        parsed.feedbacks,
        parsed.summary
      );
    } catch {
      return null;
    }
  }

  async saveSession(session: XPomodoroSession): Promise<void> {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  async getUserStats(): Promise<UserStats> {
    const data = localStorage.getItem(STATS_KEY);
    try {
      if (data) return JSON.parse(data);
    } catch {
      console.error('Falha ao processar stats, reiniciando XP local.');
    }
    return { totalXP: 0 };
  }

  async updateUserXP(xpToAdd: number): Promise<void> {
    const stats = await this.getUserStats();
    stats.totalXP += xpToAdd;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }
}
