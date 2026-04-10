import { useState, useEffect } from 'react';
import { useXPomodoro } from '../hooks/useXPomodoro';
import { InteractiveOnboardingTour } from './InteractiveOnboardingTour';
import { StartCyclePhase } from './phases/StartCyclePhase';
import { ActiveTimerPhase } from './phases/ActiveTimerPhase';
import { FeedbackCollectionPhase } from './phases/FeedbackCollectionPhase';
import { SummarySubmissionPhase } from './phases/SummarySubmissionPhase';
import { SessionCompletedPhase } from './phases/SessionCompletedPhase';

export const XPomodoroApp = () => {
  const { 
    session, totalXP, timeLeft, 
    startWork, submitFeedback, submitSummary, restartSession, devSkipPhase 
  } = useXPomodoro();

  const [forceTour, setForceTour] = useState(false);

  useEffect(() => {
    const handleTourRequest = async () => {
      if (session && (session.status !== 'idle' || session.currentCycle > 1)) {
         await restartSession();
      }
      setForceTour(true);
    };

    window.addEventListener('xpomodoro:request-tour', handleTourRequest);
    return () => window.removeEventListener('xpomodoro:request-tour', handleTourRequest);
  }, [session, restartSession]);

  if (!session) return <div className="min-h-screen flex items-center justify-center text-scarlet-500 font-medium">Iniciando o cérebro do XPomodoro...</div>;

  const getStatusLabel = () => {
    switch (session.status) {
      case 'idle': return 'Pronto para começar';
      case 'working': return 'Foco Extremo';
      case 'short_break': return 'Descanso Curto';
      case 'long_break': return 'Descanso Longo';
      case 'pending_feedback': return 'Aguardando Feedback';
      case 'pending_summary': return 'Resumo da Sessão';
      case 'completed': return 'Sessão Concluída';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 w-full h-full font-sans text-zinc-100 relative">
      <InteractiveOnboardingTour 
        forceRun={forceTour} 
        onForceRunConsumed={() => setForceTour(false)} 
        isVirginSession={session.status === 'idle' && session.currentCycle === 1}
      />

      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full mx-auto pb-12">
        <div className="tour-status-board bg-zinc-900 border border-zinc-800 rounded-3xl p-8 xl:p-12 shadow-2xl w-full max-w-md relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-zinc-800">
             <div 
               className="h-full bg-scarlet-500 transition-all duration-1000 ease-linear" 
               style={{ width: `${(session.currentCycle / 4) * 100}%` }}
             />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-sm uppercase tracking-widest text-scarlet-400 font-bold mb-2">
              Ciclo {session.currentCycle} de 4
            </h2>
            <div className="text-xl font-medium text-zinc-300">
              {getStatusLabel()}
            </div>
          </div>

          {['working', 'short_break', 'long_break'].includes(session.status) && (
            <ActiveTimerPhase timeLeft={timeLeft} onSkipDev={devSkipPhase} />
          )}

          {session.status === 'idle' && (
            <StartCyclePhase 
              onStart={startWork} 
              onRestart={session.currentCycle > 1 ? restartSession : undefined} 
            />
          )}

          {session.status === 'pending_feedback' && (
            <FeedbackCollectionPhase onSubmit={submitFeedback} />
          )}

          {session.status === 'pending_summary' && (
            <SummarySubmissionPhase onSubmit={submitSummary} />
          )}

          {session.status === 'completed' && <SessionCompletedPhase onRestart={restartSession} />}

        </div>
      </div>
    </div>
  );
};
