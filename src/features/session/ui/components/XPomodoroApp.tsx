'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { SessionStatus } from '../../domain/types/SessionStatus';
import { useXPomodoro } from '../hooks/useXPomodoro';
import { ActiveTimerPhase } from './phases/ActiveTimerPhase';
import { OnboardingTour } from './OnboardingTour';
import { FeedbackCollectionPhase } from './phases/FeedbackCollectionPhase';
import { SessionCompletedPhase } from './phases/SessionCompletedPhase';
import { StartCyclePhase } from './phases/StartCyclePhase';
import { SummarySubmissionPhase } from './phases/SummarySubmissionPhase';

const statusLabels: Record<SessionStatus, string> = {
  idle: 'Pronto para começar',
  working: 'Foco extremo',
  short_break: 'Descanso curto',
  long_break: 'Descanso longo',
  pending_feedback: 'Aguardando feedback',
  pending_summary: 'Resumo da sessão',
  completed: 'Sessão concluída',
};

export const XPomodoroApp = () => {
  const { session, timeLeft, startWork, submitFeedback, submitSummary, restartSession, devSkipPhase } = useXPomodoro();
  const [tourRequests, setTourRequests] = useState(0);

  useEffect(() => {
    const handleTourRequest = async () => {
      if (session && (session.status !== 'idle' || session.currentCycle > 1)) {
        await restartSession();
      }
      setTourRequests((count) => count + 1);
    };

    window.addEventListener('xpomodoro:request-tour', handleTourRequest);
    return () => window.removeEventListener('xpomodoro:request-tour', handleTourRequest);
  }, [session, restartSession]);

  if (!session) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Spinner label="Carregando a sessão" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <OnboardingTour
        requestCount={tourRequests}
        isVirginSession={session.status === 'idle' && session.currentCycle === 1}
      />
      <Card data-tour="status-board" className="w-full max-w-md gap-8 p-8">
        <div className="flex flex-col gap-3">
          <Progress value={session.currentCycle} max={4} size="sm" label={`Ciclo ${session.currentCycle} de 4`} />
          <p className="font-display text-display-sm font-extrabold text-ink">{statusLabels[session.status]}</p>
        </div>

        {['working', 'short_break', 'long_break'].includes(session.status) && (
          <ActiveTimerPhase timeLeft={timeLeft} onSkipDev={devSkipPhase} />
        )}

        {session.status === 'idle' && (
          <StartCyclePhase onStart={startWork} onRestart={session.currentCycle > 1 ? restartSession : undefined} />
        )}

        {session.status === 'pending_feedback' && <FeedbackCollectionPhase onSubmit={submitFeedback} />}

        {session.status === 'pending_summary' && <SummarySubmissionPhase onSubmit={submitSummary} />}

        {session.status === 'completed' && <SessionCompletedPhase onRestart={restartSession} />}
      </Card>
    </div>
  );
};
