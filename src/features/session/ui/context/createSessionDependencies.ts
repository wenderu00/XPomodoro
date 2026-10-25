import { ISessionRepository } from '../../domain/repositories/ISessionRepository';
import { CompleteBreakUseCase } from '../../usecases/CompleteBreakUseCase';
import { CompleteWorkUseCase } from '../../usecases/CompleteWorkUseCase';
import { GetSessionUseCase } from '../../usecases/GetSessionUseCase';
import { GetTotalXPUseCase } from '../../usecases/GetTotalXPUseCase';
import { ResetSessionUseCase } from '../../usecases/ResetSessionUseCase';
import { StartWorkUseCase } from '../../usecases/StartWorkUseCase';
import { SubmitFeedbackUseCase } from '../../usecases/SubmitFeedbackUseCase';
import { SubmitFinalSummaryUseCase } from '../../usecases/SubmitFinalSummaryUseCase';
import { SessionDependencies } from './SessionDependencyContext';

export const createSessionDependencies = (repository: ISessionRepository): SessionDependencies => ({
  getSessionUseCase: new GetSessionUseCase(repository),
  startWorkUseCase: new StartWorkUseCase(repository),
  completeWorkUseCase: new CompleteWorkUseCase(repository),
  submitFeedbackUseCase: new SubmitFeedbackUseCase(repository),
  completeBreakUseCase: new CompleteBreakUseCase(repository),
  resetSessionUseCase: new ResetSessionUseCase(repository),
  submitSummaryUseCase: new SubmitFinalSummaryUseCase(repository),
  getTotalXPUseCase: new GetTotalXPUseCase(repository),
});
