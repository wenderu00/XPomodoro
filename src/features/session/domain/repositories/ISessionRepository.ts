import { XPomodoroSession, UserStats } from '../entities/XPomodoro';

export interface ISessionRepository {
  getActiveSession(): Promise<XPomodoroSession | null>;
  saveSession(session: XPomodoroSession): Promise<void>;
  
  getUserStats(): Promise<UserStats>;
  updateUserXP(xpToAdd: number): Promise<void>;
}
