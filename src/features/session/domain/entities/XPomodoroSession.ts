import { SessionStatus } from '../types/SessionStatus';
import { CycleFeedback } from '../value-objects/CycleFeedback';
import { SessionSummary } from '../value-objects/SessionSummary';

export class XPomodoroSession {
  constructor(
    public readonly id: string,
    public currentCycle: number = 1,
    public status: SessionStatus = 'idle',
    public feedbacks: CycleFeedback[] = [],
    public summary?: SessionSummary
  ) {}

  public isLastCycle(): boolean {
    return this.currentCycle === 4;
  }

  public getXPToAward(): number {
    return 1; 
  }
}
