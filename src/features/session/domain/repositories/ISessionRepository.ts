import { XPomodoroSession } from '../entities/XPomodoroSession';
import { UserStats } from '../value-objects/UserStats';

export interface ISessionRepository {
  getActiveSession(): Promise<XPomodoroSession | null>;
  saveSession(session: XPomodoroSession): Promise<void>;
  
  getUserStats(): Promise<UserStats>;
  updateUserXP(xpToAdd: number): Promise<void>;
}
