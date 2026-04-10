export type SessionStatus = 
  | 'idle' 
  | 'working' 
  | 'short_break' 
  | 'long_break' 
  | 'pending_feedback' 
  | 'pending_summary' 
  | 'completed';

export type ProductivityFeeling = 'baixo' | 'médio' | 'alto';

export interface CycleFeedback {
  cycleNumber: number;
  feeling: ProductivityFeeling;
}

export interface SessionSummary {
  text: string;
  earnedXP: number;
}

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

export interface UserStats {
  totalXP: number;
}
