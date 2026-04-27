import { createContext, useContext, ReactNode } from 'react';
import { GetSessionUseCase } from '../../usecases/GetSessionUseCase';
import { StartWorkUseCase } from '../../usecases/StartWorkUseCase';
import { CompleteWorkUseCase } from '../../usecases/CompleteWorkUseCase';
import { SubmitFeedbackUseCase } from '../../usecases/SubmitFeedbackUseCase';
import { CompleteBreakUseCase } from '../../usecases/CompleteBreakUseCase';
import { ResetSessionUseCase } from '../../usecases/ResetSessionUseCase';
import { SubmitFinalSummaryUseCase } from '../../usecases/SubmitFinalSummaryUseCase';
import { GetTotalXPUseCase } from '../../usecases/GetTotalXPUseCase';

export interface SessionDependencies {
  getSessionUseCase: GetSessionUseCase;
  startWorkUseCase: StartWorkUseCase;
  completeWorkUseCase: CompleteWorkUseCase;
  submitFeedbackUseCase: SubmitFeedbackUseCase;
  completeBreakUseCase: CompleteBreakUseCase;
  resetSessionUseCase: ResetSessionUseCase;
  submitSummaryUseCase: SubmitFinalSummaryUseCase;
  getTotalXPUseCase: GetTotalXPUseCase;
}

const DependencyContext = createContext<SessionDependencies | null>(null);

export const SessionDependencyProvider = ({ children, dependencies }: { children: ReactNode, dependencies: SessionDependencies }) => {
  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  );
};

export const useSessionDependencies = (): SessionDependencies => {
  const context = useContext(DependencyContext);
  if (!context) {
    throw new Error('useSessionDependencies must be used within SessionDependencyProvider');
  }
  return context;
};
