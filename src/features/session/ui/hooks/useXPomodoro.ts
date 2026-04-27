import { useState, useEffect, useCallback } from 'react';
import { XPomodoroSession } from '../../domain/entities/XPomodoroSession';
import { ProductivityFeeling } from '../../domain/types/ProductivityFeeling';
import { useSessionDependencies } from '../context/SessionDependencyContext';

const TIMES = {
  working: 25 * 60,
  short_break: 5 * 60,
  long_break: 30 * 60,
};

export function useXPomodoro() {
  const { 
    getSessionUseCase, 
    startWorkUseCase, 
    completeWorkUseCase, 
    submitFeedbackUseCase, 
    completeBreakUseCase, 
    resetSessionUseCase, 
    submitSummaryUseCase 
  } = useSessionDependencies();
  
  const [session, setSession] = useState<XPomodoroSession | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const refreshState = useCallback(async () => {
    const { session: currentSession, stats } = await getSessionUseCase.execute();
    setSession(currentSession);
    setTotalXP(stats.totalXP);
    return currentSession;
  }, [getSessionUseCase]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  useEffect(() => {
    if (!session) return;
    let timer: number;
    
    if (['working', 'short_break', 'long_break'].includes(session.status) && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handlePhaseComplete(session.status);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [session?.status, timeLeft]);

  const handlePhaseComplete = async (status: string) => {
    if (status === 'working') {
      const updated = await completeWorkUseCase.execute();
      setSession(updated);
      if (updated.status === 'long_break') setTimeLeft(TIMES.long_break);
    } else if (status === 'short_break' || status === 'long_break') {
      const updated = await completeBreakUseCase.execute();
      setSession(updated);
    }
  };

  const startWork = async () => {
    const updated = await startWorkUseCase.execute();
    setSession(updated);
    setTimeLeft(TIMES.working);
  };

  const submitFeedback = async (feeling: ProductivityFeeling) => {
    const updated = await submitFeedbackUseCase.execute(feeling);
    setSession(updated);
    setTimeLeft(updated.status === 'long_break' ? TIMES.long_break : TIMES.short_break);
  };

  const submitSummary = async (text: string) => {
    const result = await submitSummaryUseCase.execute(text);
    const updated = await refreshState();
    setSession(updated);
    return result;
  };

  const restartSession = async () => {
    const updated = await resetSessionUseCase.execute();
    setSession(updated);
    setTimeLeft(0);
  };

  const devSkipPhase = () => setTimeLeft(1);

  return {
    session,
    totalXP,
    timeLeft,
    startWork,
    submitFeedback,
    submitSummary,
    restartSession,
    devSkipPhase
  };
}
